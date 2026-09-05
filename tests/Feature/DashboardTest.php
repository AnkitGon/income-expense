<?php

use App\Enums\TeamRole;
use App\Models\BankAccount;
use App\Models\Category;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this
        ->actingAs($user)
        ->get(route('dashboard'));

    $response->assertOk();
});

test('dashboard includes pending invitations for the authenticated user', function () {
    $owner = User::factory()->create(['name' => 'Taylor Otwell']);
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $team = Team::factory()->create(['name' => 'Laravel Team']);

    $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

    $invitation = TeamInvitation::factory()->create([
        'team_id' => $team->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($invitedUser)
        ->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('pendingInvitations', 1)
        ->where('pendingInvitations.0.code', $invitation->code)
        ->where('pendingInvitations.0.inviterName', 'Taylor Otwell')
        ->where('pendingInvitations.0.team.name', 'Laravel Team')
        ->where('pendingInvitations.0.team.slug', $team->slug)
        ->missing('pendingInvitations.0.teamName'),
    );
});

test('dashboard does not include accepted invitations', function () {
    $owner = User::factory()->create();
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $team = Team::factory()->create();

    $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

    TeamInvitation::factory()->accepted()->create([
        'team_id' => $team->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($invitedUser)
        ->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('pendingInvitations', 0),
    );
});

test('dashboard excludes expired invitations without deleting them', function () {
    $owner = User::factory()->create();
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $team = Team::factory()->create();

    $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

    $invitation = TeamInvitation::factory()->expired()->create([
        'team_id' => $team->id,
        'email' => 'invited@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($invitedUser)
        ->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('pendingInvitations', 0),
    );

    $this->assertDatabaseHas('team_invitations', [
        'id' => $invitation->id,
    ]);
});

test('dashboard does not include or delete other users invitations', function () {
    $owner = User::factory()->create();
    $invitedUser = User::factory()->create(['email' => 'invited@example.com']);
    $team = Team::factory()->create();

    $team->members()->attach($owner, ['role' => TeamRole::Owner->value]);

    $invitation = TeamInvitation::factory()->expired()->create([
        'team_id' => $team->id,
        'email' => 'someone@example.com',
        'invited_by' => $owner->id,
    ]);

    $response = $this
        ->actingAs($invitedUser)
        ->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('pendingInvitations', 0),
    );

    $this->assertDatabaseHas('team_invitations', [
        'id' => $invitation->id,
    ]);
});

test('dashboard shows transaction summary by category for selected month', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;
    $categoryA = Category::factory()->create(['team_id' => $team->id, 'name' => 'Category A']);
    $categoryB = Category::factory()->create(['team_id' => $team->id, 'name' => 'Category B']);

    $currentMonth = Carbon::now()->format('Y-m');

    // Create credit transaction for Category A
    Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $categoryA->id,
        'type' => 'credit',
        'amount' => 100.00,
        'date' => Carbon::now()->startOfMonth()->toDateString(),
    ]);

    // Create debit transaction for Category B
    Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $categoryB->id,
        'type' => 'debit',
        'amount' => 40.00,
        'date' => Carbon::now()->startOfMonth()->toDateString(),
    ]);

    // Create transaction in a different month (should be excluded)
    Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $categoryA->id,
        'type' => 'credit',
        'amount' => 500.00,
        'date' => Carbon::now()->subMonth()->startOfMonth()->toDateString(),
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('dashboard', ['current_team' => $team->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('summary', 2)
        ->where('summary.0.name', 'Category A')
        ->where('summary.0.credit', 100)
        ->where('summary.0.debit', 0)
        ->where('summary.1.name', 'Category B')
        ->where('summary.1.credit', 0)
        ->where('summary.1.debit', 40)
    );
});

test('dashboard filters out categories with zero credit and debit', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    // Category with no transactions
    Category::factory()->create(['team_id' => $team->id, 'name' => 'Zero Category']);

    $response = $this
        ->actingAs($user)
        ->get(route('dashboard', ['current_team' => $team->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('summary', 0) // Zero Category is filtered out since it has 0 credits and debits
    );
});

test('dashboard shows transaction summary by category for custom date range', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;
    $categoryA = Category::factory()->create(['team_id' => $team->id, 'name' => 'Category A']);
    $categoryB = Category::factory()->create(['team_id' => $team->id, 'name' => 'Category B']);

    // Create transaction within range
    Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $categoryA->id,
        'type' => 'credit',
        'amount' => 120.00,
        'date' => '2026-08-10',
    ]);

    // Create transaction within range
    Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $categoryB->id,
        'type' => 'debit',
        'amount' => 30.00,
        'date' => '2026-08-12',
    ]);

    // Create transaction outside range (before)
    Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $categoryA->id,
        'type' => 'credit',
        'amount' => 500.00,
        'date' => '2026-08-09',
    ]);

    // Create transaction outside range (after)
    Transaction::factory()->create([
        'team_id' => $team->id,
        'category_id' => $categoryA->id,
        'type' => 'credit',
        'amount' => 600.00,
        'date' => '2026-08-16',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('dashboard', [
            'current_team' => $team->slug,
            'from_date' => '2026-08-10',
            'to_date' => '2026-08-15',
        ]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('summary', 2)
        ->where('summary.0.name', 'Category A')
        ->where('summary.0.credit', 120)
        ->where('summary.1.name', 'Category B')
        ->where('summary.1.debit', 30)
        ->where('startDate', '2026-08-10')
        ->where('endDate', '2026-08-15')
    );
});

test('dashboard filters transaction summary by selected bank account', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $account1 = BankAccount::factory()->create(['team_id' => $team->id, 'name' => 'Account 1']);
    $account2 = BankAccount::factory()->create(['team_id' => $team->id, 'name' => 'Account 2']);

    $category = Category::factory()->create(['team_id' => $team->id, 'name' => 'General']);

    Transaction::factory()->create([
        'team_id' => $team->id,
        'bank_account_id' => $account1->id,
        'category_id' => $category->id,
        'type' => 'credit',
        'amount' => 200.00,
        'date' => Carbon::now()->startOfMonth()->toDateString(),
    ]);

    Transaction::factory()->create([
        'team_id' => $team->id,
        'bank_account_id' => $account2->id,
        'category_id' => $category->id,
        'type' => 'credit',
        'amount' => 500.00,
        'date' => Carbon::now()->startOfMonth()->toDateString(),
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('dashboard', [
            'current_team' => $team->slug,
            'bank_account_id' => $account1->id,
        ]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->where('selectedBankAccountId', $account1->id)
        ->has('summary', 1)
        ->where('summary.0.credit', 200)
    );
});
