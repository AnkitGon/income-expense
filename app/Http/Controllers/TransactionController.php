<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display a listing of the transactions.
     */
    public function index(Request $request, Team $current_team): Response
    {
        $transactions = $current_team->transactions()
            ->with(['category', 'bankAccount'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('description', 'like', "%{$search}%")
                        ->orWhereHas('category', function ($cq) use ($search) {
                            $cq->where('name', 'like', "%{$search}%");
                        })
                        ->orWhereHas('bankAccount', function ($bq) use ($search) {
                            $bq->where('name', 'like', "%{$search}%")
                                ->orWhere('bank_name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->has('category_id'), function ($query) use ($request) {
                $categoryId = $request->category_id;
                if ($categoryId === 'uncategorized' || $categoryId === null || $categoryId === '') {
                    $query->whereNull('category_id');
                } else {
                    $query->where('category_id', $categoryId);
                }
            })
            ->when($request->filled('bank_account_id'), function ($query) use ($request) {
                $query->where('bank_account_id', $request->bank_account_id);
            })
            ->when($request->from_date, function ($query, $fromDate) {
                $query->where('date', '>=', $fromDate);
            })
            ->when($request->to_date, function ($query, $toDate) {
                $query->where('date', '<=', $toDate);
            })
            ->latest('date')
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        $categories = $current_team->categories()
            ->orderBy('name')
            ->get();

        $bankAccounts = $current_team->bankAccounts()
            ->orderBy('name')
            ->get();

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'categories' => $categories,
            'bankAccounts' => $bankAccounts,
            'filters' => $request->only(['search', 'category_id', 'bank_account_id', 'from_date', 'to_date']),
        ]);
    }

    /**
     * Store a newly created transaction in storage.
     */
    public function store(Request $request, Team $current_team): RedirectResponse
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'bank_account_id' => [
                'required',
                Rule::exists('bank_accounts', 'id')->where('team_id', $current_team->id),
            ],
            'category_id' => [
                'nullable',
                Rule::exists('categories', 'id')->where('team_id', $current_team->id),
            ],
            'type' => ['required', 'string', Rule::in(['credit', 'debit', 'transfer'])],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $current_team->transactions()->create($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Transaction recorded successfully.'),
        ]);

        return back();
    }

    /**
     * Update the specified transaction in storage.
     */
    public function update(Request $request, Team $current_team, Transaction $transaction): RedirectResponse
    {
        abort_unless($transaction->team_id === $current_team->id, 403);

        $validated = $request->validate([
            'date' => ['required', 'date'],
            'bank_account_id' => [
                'required',
                Rule::exists('bank_accounts', 'id')->where('team_id', $current_team->id),
            ],
            'category_id' => [
                'nullable',
                Rule::exists('categories', 'id')->where('team_id', $current_team->id),
            ],
            'type' => ['required', 'string', Rule::in(['credit', 'debit', 'transfer'])],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $transaction->update($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Transaction updated successfully.'),
        ]);

        return back();
    }

    /**
     * Remove the specified transaction from storage.
     */
    public function destroy(Request $request, Team $current_team, Transaction $transaction): RedirectResponse
    {
        abort_unless($transaction->team_id === $current_team->id, 403);

        if ($transaction->transfer_pair_id) {
            $pairId = $transaction->transfer_pair_id;
            $transaction->update(['transfer_pair_id' => null]);
            Transaction::where('id', $pairId)->delete();
        }

        $transaction->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Transaction deleted successfully.'),
        ]);

        return back();
    }
}
