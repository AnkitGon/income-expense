<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BankAccountController extends Controller
{
    /**
     * Display a listing of the bank accounts.
     */
    public function index(Request $request, Team $current_team): Response
    {
        $bankAccounts = $current_team->bankAccounts()
            ->withCount('transactions')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('bank_name', 'like', "%{$search}%")
                        ->orWhere('account_number', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('bank-accounts/index', [
            'bankAccounts' => $bankAccounts,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created bank account in storage.
     */
    public function store(Request $request, Team $current_team): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'bank_name' => ['required', 'string', 'max:255'],
            'account_number' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $current_team->bankAccounts()->create($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Bank account created successfully.'),
        ]);

        return back();
    }

    /**
     * Update the specified bank account in storage.
     */
    public function update(Request $request, Team $current_team, BankAccount $bankAccount): RedirectResponse
    {
        abort_unless($bankAccount->team_id === $current_team->id, 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'bank_name' => ['required', 'string', 'max:255'],
            'account_number' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $bankAccount->update($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Bank account updated successfully.'),
        ]);

        return back();
    }

    /**
     * Remove the specified bank account from storage.
     */
    public function destroy(Request $request, Team $current_team, BankAccount $bankAccount): RedirectResponse
    {
        abort_unless($bankAccount->team_id === $current_team->id, 403);

        $bankAccount->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Bank account deleted successfully.'),
        ]);

        return back();
    }
}
