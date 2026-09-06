<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamInvitation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request, Team $current_team): Response
    {
        $email = strtolower($request->user()->email);

        $pendingInvitations = TeamInvitation::query()
            ->with(['inviter', 'team'])
            ->whereRaw('LOWER(email) = ?', [$email])
            ->whereNull('accepted_at')
            ->where(fn ($query) => $query
                ->whereNull('expires_at')
                ->orWhere('expires_at', '>=', now()))
            ->latest()
            ->get()
            ->map(fn (TeamInvitation $invitation) => [
                'code' => $invitation->code,
                'inviterName' => $invitation->inviter->name,
                'team' => [
                    'name' => $invitation->team->name,
                    'slug' => $invitation->team->slug,
                ],
            ]);

        $selectedMonth = $request->input('month');
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');
        $bankAccountId = $request->input('bank_account_id');

        $isValidRange = false;
        if ($fromDate && $toDate) {
            try {
                $start = Carbon::parse($fromDate);
                $end = Carbon::parse($toDate);
                if ($start->lte($end)) {
                    $startDate = $start->toDateString();
                    $endDate = $end->toDateString();
                    $isValidRange = true;
                }
            } catch (\Exception $e) {
                // Ignore and fall back to month
            }
        }

        if (! $isValidRange) {
            if (! $selectedMonth || ! preg_match('/^\d{4}-\d{2}$/', $selectedMonth)) {
                $selectedMonth = Carbon::now()->format('Y-m');
            }
            $startDate = Carbon::parse($selectedMonth.'-01')->startOfMonth()->toDateString();
            $endDate = Carbon::parse($selectedMonth.'-01')->endOfMonth()->toDateString();
        } else {
            $selectedMonth = '';
        }

        $bankAccounts = $current_team->bankAccounts()
            ->orderBy('name')
            ->get();

        // Calculate summary for each bank account (grouping)
        $accountSummaries = $bankAccounts->map(function ($account) use ($current_team, $startDate, $endDate) {
            $credit = $current_team->transactions()
                ->where('bank_account_id', $account->id)
                ->where('type', 'credit')
                ->whereBetween('date', [$startDate, $endDate])
                ->sum('amount');

            $debit = $current_team->transactions()
                ->where('bank_account_id', $account->id)
                ->where('type', 'debit')
                ->whereBetween('date', [$startDate, $endDate])
                ->sum('amount');

            $transferIn = $current_team->transactions()
                ->where('bank_account_id', $account->id)
                ->where('type', 'transfer')
                ->whereColumn('id', '>', 'transfer_pair_id')
                ->whereBetween('date', [$startDate, $endDate])
                ->sum('amount');

            $transferOut = $current_team->transactions()
                ->where('bank_account_id', $account->id)
                ->where('type', 'transfer')
                ->whereColumn('id', '<', 'transfer_pair_id')
                ->whereBetween('date', [$startDate, $endDate])
                ->sum('amount');

            $totalCredit = $credit + $transferIn;
            $totalDebit = $debit + $transferOut;

            return [
                'id' => $account->id,
                'name' => $account->name,
                'bank_name' => $account->bank_name,
                'account_number' => $account->account_number,
                'credit' => (float) $totalCredit,
                'debit' => (float) $totalDebit,
                'income' => (float) $credit,
                'expenses' => (float) $debit,
                'transfers_in' => (float) $transferIn,
                'transfers_out' => (float) $transferOut,
                'balance' => (float) ($totalCredit - $totalDebit),
            ];
        });

        // Query helper for filtered transactions
        $transactionQuery = fn () => $current_team->transactions()
            ->when($bankAccountId, function ($query) use ($bankAccountId) {
                $query->where('bank_account_id', $bankAccountId);
            });

        $categories = $current_team->categories()
            ->get()
            ->map(function ($category) use ($transactionQuery, $startDate, $endDate) {
                $credit = $transactionQuery()
                    ->where('category_id', $category->id)
                    ->where('type', 'credit')
                    ->whereBetween('date', [$startDate, $endDate])
                    ->sum('amount');

                $debit = $transactionQuery()
                    ->where('category_id', $category->id)
                    ->where('type', 'debit')
                    ->whereBetween('date', [$startDate, $endDate])
                    ->sum('amount');

                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'credit' => (float) $credit,
                    'debit' => (float) $debit,
                    'total' => (float) ($credit - $debit),
                ];
            })
            ->filter(function ($item) {
                return $item['credit'] > 0 || $item['debit'] > 0;
            })
            ->values();

        // Include uncategorized transactions
        $uncategorizedCredit = $transactionQuery()
            ->whereNull('category_id')
            ->where('type', 'credit')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        $uncategorizedDebit = $transactionQuery()
            ->whereNull('category_id')
            ->where('type', 'debit')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        if ($uncategorizedCredit > 0 || $uncategorizedDebit > 0) {
            $categories->push([
                'id' => null,
                'name' => __('Uncategorized'),
                'credit' => (float) $uncategorizedCredit,
                'debit' => (float) $uncategorizedDebit,
                'total' => (float) ($uncategorizedCredit - $uncategorizedDebit),
            ]);
        }

        // Calculate internal transfers summary separately for reconciliation
        $transferIn = $transactionQuery()
            ->where('type', 'transfer')
            ->whereColumn('id', '>', 'transfer_pair_id')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        $transferOut = $transactionQuery()
            ->where('type', 'transfer')
            ->whereColumn('id', '<', 'transfer_pair_id')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        $transfersSummary = [
            'transfers_in' => (float) $transferIn,
            'transfers_out' => (float) $transferOut,
            'net_transfer' => (float) ($transferIn - $transferOut),
        ];

        $sortedCategories = $categories->sortBy(function ($item) {
            $isCredit = $item['credit'] > 0;
            $group = $isCredit ? 0 : 1;
            $subSort = $isCredit ? -$item['credit'] : -$item['debit'];

            return [$group, $subSort];
        })->values();

        return Inertia::render('dashboard', [
            'pendingInvitations' => $pendingInvitations,
            'summary' => $sortedCategories,
            'transfersSummary' => $transfersSummary,
            'bankAccounts' => $bankAccounts,
            'accountSummaries' => $accountSummaries,
            'selectedBankAccountId' => $bankAccountId ? (int) $bankAccountId : null,
            'selectedMonth' => $selectedMonth,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }
}
