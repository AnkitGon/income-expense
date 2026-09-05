<?php

use App\Models\BankAccount;
use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page when accessing bank accounts', function () {
    $response = $this->get(route('bank-accounts.index', ['current_team' => 'test-team']));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the bank accounts page', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this
        ->actingAs($user)
        ->get(route('bank-accounts.index', ['current_team' => $team->slug]));

    $response->assertOk();
});

test('bank accounts page lists bank accounts belonging to the user active team', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $bankAccount = BankAccount::factory()->create([
        'team_id' => $team->id,
        'name' => 'Main Checking',
        'bank_name' => 'Chase',
    ]);

    $otherTeam = Team::factory()->create();
    $otherAccount = BankAccount::factory()->create([
        'team_id' => $otherTeam->id,
        'name' => 'Other Checking',
        'bank_name' => 'HSBC',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('bank-accounts.index', ['current_team' => $team->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('bank-accounts/index')
        ->has('bankAccounts.data', 1)
        ->where('bankAccounts.data.0.name', 'Main Checking')
    );
});

test('bank accounts page can be searched', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    BankAccount::factory()->create([
        'team_id' => $team->id,
        'name' => 'Business Savings',
        'bank_name' => 'Barclays',
    ]);

    BankAccount::factory()->create([
        'team_id' => $team->id,
        'name' => 'Payroll Account',
        'bank_name' => 'Wells Fargo',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('bank-accounts.index', [
            'current_team' => $team->slug,
            'search' => 'Barclays',
        ]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('bank-accounts/index')
        ->has('bankAccounts.data', 1)
        ->where('bankAccounts.data.0.name', 'Business Savings')
    );
});

test('user can create a bank account', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this
        ->actingAs($user)
        ->post(route('bank-accounts.store', ['current_team' => $team->slug]), [
            'name' => 'Primary Checking',
            'bank_name' => 'Bank of America',
            'account_number' => '****1234',
            'description' => 'Main operational account',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('bank_accounts', [
        'team_id' => $team->id,
        'name' => 'Primary Checking',
        'bank_name' => 'Bank of America',
        'account_number' => '****1234',
        'description' => 'Main operational account',
    ]);
});

test('user can update a bank account', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $account = BankAccount::factory()->create([
        'team_id' => $team->id,
        'name' => 'Old Name',
        'bank_name' => 'Old Bank',
    ]);

    $response = $this
        ->actingAs($user)
        ->put(route('bank-accounts.update', [
            'current_team' => $team->slug,
            'bank_account' => $account->id,
        ]), [
            'name' => 'Updated Name',
            'bank_name' => 'Updated Bank',
            'account_number' => '9999',
            'description' => 'Updated notes',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('bank_accounts', [
        'id' => $account->id,
        'name' => 'Updated Name',
        'bank_name' => 'Updated Bank',
    ]);
});

test('user cannot update another team bank account', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $otherTeam = Team::factory()->create();
    $otherAccount = BankAccount::factory()->create([
        'team_id' => $otherTeam->id,
    ]);

    $response = $this
        ->actingAs($user)
        ->put(route('bank-accounts.update', [
            'current_team' => $team->slug,
            'bank_account' => $otherAccount->id,
        ]), [
            'name' => 'Hacked Name',
            'bank_name' => 'Hacked Bank',
        ]);

    $response->assertForbidden();
});

test('user can delete a bank account', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $account = BankAccount::factory()->create([
        'team_id' => $team->id,
    ]);

    $response = $this
        ->actingAs($user)
        ->delete(route('bank-accounts.destroy', [
            'current_team' => $team->slug,
            'bank_account' => $account->id,
        ]));

    $response->assertRedirect();
    $this->assertDatabaseMissing('bank_accounts', [
        'id' => $account->id,
    ]);
});

test('user cannot delete another team bank account', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $otherTeam = Team::factory()->create();
    $account = BankAccount::factory()->create([
        'team_id' => $otherTeam->id,
    ]);

    $response = $this
        ->actingAs($user)
        ->delete(route('bank-accounts.destroy', [
            'current_team' => $team->slug,
            'bank_account' => $account->id,
        ]));

    $response->assertForbidden();
    $this->assertDatabaseHas('bank_accounts', [
        'id' => $account->id,
    ]);
});
