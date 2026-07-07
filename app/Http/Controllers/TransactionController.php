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
            ->with('category')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('description', 'like', "%{$search}%")
                        ->orWhereHas('category', function ($cq) use ($search) {
                            $cq->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->latest('date')
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        $categories = $current_team->categories()
            ->orderBy('name')
            ->get();

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created transaction in storage.
     */
    public function store(Request $request, Team $current_team): RedirectResponse
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'category_id' => [
                'nullable',
                Rule::exists('categories', 'id')->where('team_id', $current_team->id),
            ],
            'type' => ['required', 'string', Rule::in(['credit', 'debit'])],
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
            'category_id' => [
                'nullable',
                Rule::exists('categories', 'id')->where('team_id', $current_team->id),
            ],
            'type' => ['required', 'string', Rule::in(['credit', 'debit'])],
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

        $transaction->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Transaction deleted successfully.'),
        ]);

        return back();
    }
}
