<?php

use App\Models\BankAccount;
use App\Models\Category;
use App\Models\Team;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot create a bank transfer', function () {
    $response = $this->post(route('transfers.store', ['current_team' => 'test-team']));
    $response->assertRedirect(route('login'));
});

test('user can transfer money between two bank accounts', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $accountA = BankAccount::factory()->create(['team_id' => $team->id, 'name' => 'Checking']);
    $accountB = BankAccount::factory()->create(['team_id' => $team->id, 'name' => 'Savings']);

    $response = $this
        ->actingAs($user)
        ->post(route('transfers.store', ['current_team' => $team->slug]), [
            'from_bank_account_id' => $accountA->id,
            'to_bank_account_id' => $accountB->id,
            'date' => '2026-09-05',
            'amount' => 10000.00,
            'description' => '10k savings transfer',
        ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('transactions', [
        'team_id' => $team->id,
        'bank_account_id' => $accountA->id,
        'type' => 'transfer',
        'amount' => 10000.00,
        'description' => '10k savings transfer',
    ]);

    $this->assertDatabaseHas('transactions', [
        'team_id' => $team->id,
        'bank_account_id' => $accountB->id,
        'type' => 'transfer',
        'amount' => 10000.00,
        'description' => '10k savings transfer',
    ]);

    $outbound = Transaction::where('bank_account_id', $accountA->id)->first();
    $inbound = Transaction::where('bank_account_id', $accountB->id)->first();

    expect($outbound->transfer_pair_id)->toBe($inbound->id);
    expect($inbound->transfer_pair_id)->toBe($outbound->id);
});

test('user cannot transfer money to the same bank account', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $accountA = BankAccount::factory()->create(['team_id' => $team->id]);

    $response = $this
        ->actingAs($user)
        ->post(route('transfers.store', ['current_team' => $team->slug]), [
            'from_bank_account_id' => $accountA->id,
            'to_bank_account_id' => $accountA->id,
            'date' => '2026-09-05',
            'amount' => 1000.00,
        ]);

    $response->assertSessionHasErrors(['from_bank_account_id', 'to_bank_account_id']);
});

test('user cannot transfer using another team bank account', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;
    $accountA = BankAccount::factory()->create(['team_id' => $team->id]);

    $otherTeam = Team::factory()->create();
    $otherAccount = BankAccount::factory()->create(['team_id' => $otherTeam->id]);

    $response = $this
        ->actingAs($user)
        ->post(route('transfers.store', ['current_team' => $team->slug]), [
            'from_bank_account_id' => $accountA->id,
            'to_bank_account_id' => $otherAccount->id,
            'date' => '2026-09-05',
            'amount' => 1000.00,
        ]);

    $response->assertSessionHasErrors(['to_bank_account_id']);
});

test('deleting one side of a transfer deletes the paired transfer transaction', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $accountA = BankAccount::factory()->create(['team_id' => $team->id]);
    $accountB = BankAccount::factory()->create(['team_id' => $team->id]);

    $response = $this->actingAs($user)->post(route('transfers.store', ['current_team' => $team->slug]), [
        'from_bank_account_id' => $accountA->id,
        'to_bank_account_id' => $accountB->id,
        'date' => '2026-09-05',
        'amount' => 5000.00,
    ]);

    $outbound = Transaction::where('bank_account_id', $accountA->id)->first();
    $inbound = Transaction::where('bank_account_id', $accountB->id)->first();

    $response = $this
        ->actingAs($user)
        ->delete(route('transactions.destroy', [
            'current_team' => $team->slug,
            'transaction' => $outbound->id,
        ]));

    $response->assertRedirect();
    $this->assertDatabaseMissing('transactions', ['id' => $outbound->id]);
    $this->assertDatabaseMissing('transactions', ['id' => $inbound->id]);
});

test('transfers are excluded from total income and expense category reports but update bank account balances', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $accountA = BankAccount::factory()->create(['team_id' => $team->id, 'name' => 'Account A']);
    $accountB = BankAccount::factory()->create(['team_id' => $team->id, 'name' => 'Account B']);

    $category = Category::factory()->create(['team_id' => $team->id, 'name' => 'Sales']);

    // Real income transaction: 5,000 credit to Account A
    Transaction::factory()->create([
        'team_id' => $team->id,
        'bank_account_id' => $accountA->id,
        'category_id' => $category->id,
        'type' => 'credit',
        'amount' => 5000.00,
        'date' => Carbon::now()->startOfMonth()->toDateString(),
    ]);

    // 10,000 transfer from Account A to Account B
    $this->actingAs($user)->post(route('transfers.store', ['current_team' => $team->slug]), [
        'from_bank_account_id' => $accountA->id,
        'to_bank_account_id' => $accountB->id,
        'date' => Carbon::now()->startOfMonth()->toDateString(),
        'amount' => 10000.00,
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('dashboard', ['current_team' => $team->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        // Category summary only reflects real income (5000), transfer (10000) is NOT added to income or expense!
        ->has('summary', 1)
        ->where('summary.0.credit', 5000)
        ->where('summary.0.debit', 0)
        // Bank account balances correctly reflect transfer
        ->has('accountSummaries', 2)
        ->where('accountSummaries.0.balance', -5000) // Account A: +5000 income - 10000 transfer out = -5000
        ->where('accountSummaries.1.balance', 10000) // Account B: +10000 transfer in = +10000
    );
});
