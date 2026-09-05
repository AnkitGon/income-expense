<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Team;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TransferController extends Controller
{
    /**
     * Store a newly created bank transfer.
     */
    public function store(Request $request, Team $current_team): RedirectResponse
    {
        $validated = $request->validate([
            'from_bank_account_id' => [
                'required',
                Rule::exists('bank_accounts', 'id')->where('team_id', $current_team->id),
                'different:to_bank_account_id',
            ],
            'to_bank_account_id' => [
                'required',
                Rule::exists('bank_accounts', 'id')->where('team_id', $current_team->id),
                'different:from_bank_account_id',
            ],
            'date' => ['required', 'date'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $fromAccount = BankAccount::where('team_id', $current_team->id)->findOrFail($validated['from_bank_account_id']);
        $toAccount = BankAccount::where('team_id', $current_team->id)->findOrFail($validated['to_bank_account_id']);

        $description = ! empty($validated['description']) ? trim($validated['description']) : null;

        DB::transaction(function () use ($current_team, $fromAccount, $toAccount, $validated, $description) {
            // 1. Create Outbound Transfer Transaction (from source bank account)
            $outbound = Transaction::create([
                'team_id' => $current_team->id,
                'bank_account_id' => $fromAccount->id,
                'category_id' => null,
                'date' => $validated['date'],
                'type' => 'transfer',
                'amount' => $validated['amount'],
                'description' => $description ?: __('Transfer to :bank', ['bank' => $toAccount->name]),
            ]);

            // 2. Create Inbound Transfer Transaction (to destination bank account)
            $inbound = Transaction::create([
                'team_id' => $current_team->id,
                'bank_account_id' => $toAccount->id,
                'category_id' => null,
                'date' => $validated['date'],
                'type' => 'transfer',
                'amount' => $validated['amount'],
                'description' => $description ?: __('Transfer from :bank', ['bank' => $fromAccount->name]),
            ]);

            // 3. Link transfer pairs
            $outbound->update(['transfer_pair_id' => $inbound->id]);
            $inbound->update(['transfer_pair_id' => $outbound->id]);
        });

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Bank transfer executed successfully.'),
        ]);

        return back();
    }
}
