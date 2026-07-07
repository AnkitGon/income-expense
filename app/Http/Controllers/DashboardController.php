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

        $selectedMonth = $request->input('month', Carbon::now()->format('Y-m'));
        if (! preg_match('/^\d{4}-\d{2}$/', $selectedMonth)) {
            $selectedMonth = Carbon::now()->format('Y-m');
        }

        $startDate = Carbon::parse($selectedMonth.'-01')->startOfMonth()->toDateString();
        $endDate = Carbon::parse($selectedMonth.'-01')->endOfMonth()->toDateString();

        $categories = $current_team->categories()
            ->get()
            ->map(function ($category) use ($current_team, $startDate, $endDate) {
                $credit = $current_team->transactions()
                    ->where('category_id', $category->id)
                    ->where('type', 'credit')
                    ->whereBetween('date', [$startDate, $endDate])
                    ->sum('amount');

                $debit = $current_team->transactions()
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
        $uncategorizedCredit = $current_team->transactions()
            ->whereNull('category_id')
            ->where('type', 'credit')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        $uncategorizedDebit = $current_team->transactions()
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

        return Inertia::render('dashboard', [
            'pendingInvitations' => $pendingInvitations,
            'summary' => $categories,
            'selectedMonth' => $selectedMonth,
        ]);
    }
}
