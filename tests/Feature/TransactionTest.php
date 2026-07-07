<?php

use App\Models\Category;
use App\Models\Team;
use App\Models\Transaction;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('transactions.index', ['current_team' => 'test-team']));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the transactions page', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this
        ->actingAs($user)
        ->get(route('transactions.index', ['current_team' => $team->slug]));

    $response->assertOk();
});

test('transactions page lists transactions belonging to the user\'s active team', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $category = Category::factory()->create(['team_id' => $team->id]);

    $transactionInTeam = Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $category->id,
        'description' => 'Active Team Transaction',
    ]);

    $otherTeam = Team::factory()->create();
    $transactionInOtherTeam = Transaction::factory()->create([
        'team_id' => $otherTeam->id,
        'description' => 'Other Team Transaction',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('transactions.index', ['current_team' => $team->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('transactions/index')
        ->has('transactions.data', 1)
        ->where('transactions.data.0.description', 'Active Team Transaction')
    );
});

test('transactions page can be searched', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    Transaction::factory()->create([
        'team_id' => $team->id,
        'description' => 'Weekly grocery bill',
    ]);

    Transaction::factory()->create([
        'team_id' => $team->id,
        'description' => 'Server hosting fee',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('transactions.index', [
            'current_team' => $team->slug,
            'search' => 'grocery',
        ]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('transactions/index')
        ->has('transactions.data', 1)
        ->where('transactions.data.0.description', 'Weekly grocery bill')
    );
});

test('user can create a transaction', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;
    $category = Category::factory()->create(['team_id' => $team->id]);

    $response = $this
        ->actingAs($user)
        ->post(route('transactions.store', ['current_team' => $team->slug]), [
            'date' => '2026-07-07',
            'category_id' => $category->id,
            'type' => 'debit',
            'amount' => 45.50,
            'description' => 'Lunch meeting',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('transactions', [
        'team_id' => $team->id,
        'category_id' => $category->id,
        'date' => '2026-07-07 00:00:00',
        'type' => 'debit',
        'amount' => 45.50,
        'description' => 'Lunch meeting',
    ]);
});

test('user cannot create a transaction with category from another team', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $otherTeam = Team::factory()->create();
    $otherCategory = Category::factory()->create(['team_id' => $otherTeam->id]);

    $response = $this
        ->actingAs($user)
        ->post(route('transactions.store', ['current_team' => $team->slug]), [
            'date' => '2026-07-07',
            'category_id' => $otherCategory->id,
            'type' => 'debit',
            'amount' => 45.50,
            'description' => 'Hack Attempt',
        ]);

    $response->assertSessionHasErrors(['category_id']);
});

test('user can update a transaction', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;
    $category = Category::factory()->create(['team_id' => $team->id]);

    $transaction = Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $category->id,
        'date' => '2026-07-01',
        'type' => 'debit',
        'amount' => 10.00,
        'description' => 'Old description',
    ]);

    $response = $this
        ->actingAs($user)
        ->put(route('transactions.update', [
            'current_team' => $team->slug,
            'transaction' => $transaction->id,
        ]), [
            'date' => '2026-07-02',
            'category_id' => $category->id,
            'type' => 'credit',
            'amount' => 20.00,
            'description' => 'New description',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('transactions', [
        'id' => $transaction->id,
        'date' => '2026-07-02 00:00:00',
        'type' => 'credit',
        'amount' => 20.00,
        'description' => 'New description',
    ]);
});

test('user cannot update another team\'s transaction', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $otherTeam = Team::factory()->create();
    $transaction = Transaction::factory()->create([
        'team_id' => $otherTeam->id,
        'description' => 'Other Team',
    ]);

    $response = $this
        ->actingAs($user)
        ->put(route('transactions.update', [
            'current_team' => $team->slug,
            'transaction' => $transaction->id,
        ]), [
            'date' => '2026-07-02',
            'type' => 'credit',
            'amount' => 20.00,
            'description' => 'Hack Attempt',
        ]);

    $response->assertForbidden();
});

test('user can delete a transaction', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $transaction = Transaction::factory()->create([
        'team_id' => $team->id,
    ]);

    $response = $this
        ->actingAs($user)
        ->delete(route('transactions.destroy', [
            'current_team' => $team->slug,
            'transaction' => $transaction->id,
        ]));

    $response->assertRedirect();
    $this->assertDatabaseMissing('transactions', [
        'id' => $transaction->id,
    ]);
});

test('user cannot delete another team\'s transaction', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $otherTeam = Team::factory()->create();
    $transaction = Transaction::factory()->create([
        'team_id' => $otherTeam->id,
    ]);

    $response = $this
        ->actingAs($user)
        ->delete(route('transactions.destroy', [
            'current_team' => $team->slug,
            'transaction' => $transaction->id,
        ]));

    $response->assertForbidden();
    $this->assertDatabaseHas('transactions', [
        'id' => $transaction->id,
    ]);
});
