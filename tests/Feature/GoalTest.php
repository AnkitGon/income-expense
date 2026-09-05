<?php

use App\Models\Goal;
use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page when accessing goals', function () {
    $response = $this->get(route('goals.index', ['current_team' => 'test-team']));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the goals page', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this
        ->actingAs($user)
        ->get(route('goals.index', ['current_team' => $team->slug]));

    $response->assertOk();
});

test('goals page lists goals belonging to the user active team sorted by sort_order', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $goal1 = Goal::factory()->create([
        'team_id' => $team->id,
        'name' => 'Buy House',
        'sort_order' => 2,
    ]);

    $goal2 = Goal::factory()->create([
        'team_id' => $team->id,
        'name' => 'Buy Car',
        'sort_order' => 1,
    ]);

    $otherTeam = Team::factory()->create();
    Goal::factory()->create([
        'team_id' => $otherTeam->id,
        'name' => 'Other Goal',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('goals.index', ['current_team' => $team->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('goals/index')
        ->has('goals', 2)
        ->where('goals.0.name', 'Buy Car') // sort_order 1
        ->where('goals.1.name', 'Buy House') // sort_order 2
    );
});

test('user can create a goal', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this
        ->actingAs($user)
        ->post(route('goals.store', ['current_team' => $team->slug]), [
            'name' => 'Car',
            'description' => 'Save 15k for sedan',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('goals', [
        'team_id' => $team->id,
        'name' => 'Car',
        'description' => 'Save 15k for sedan',
        'status' => 'pending',
        'sort_order' => 1,
    ]);
});

test('user can update a goal and mark as achieved', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $goal = Goal::factory()->create([
        'team_id' => $team->id,
        'name' => 'Car',
        'status' => 'pending',
        'achieved_at' => null,
    ]);

    $response = $this
        ->actingAs($user)
        ->put(route('goals.update', [
            'current_team' => $team->slug,
            'goal' => $goal->id,
        ]), [
            'name' => 'Car (Electric)',
            'description' => 'Bought Tesla Model 3',
            'status' => 'achieved',
        ]);

    $response->assertRedirect();

    $goal->refresh();
    expect($goal->name)->toBe('Car (Electric)');
    expect($goal->status)->toBe('achieved');
    expect($goal->achieved_at)->not->toBeNull();
});

test('user can reorder goals priority', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $goalA = Goal::factory()->create(['team_id' => $team->id, 'sort_order' => 1]);
    $goalB = Goal::factory()->create(['team_id' => $team->id, 'sort_order' => 2]);

    $response = $this
        ->actingAs($user)
        ->post(route('goals.reorder', ['current_team' => $team->slug]), [
            'orders' => [
                ['id' => $goalA->id, 'sort_order' => 2],
                ['id' => $goalB->id, 'sort_order' => 1],
            ],
        ]);

    $response->assertRedirect();

    expect($goalA->fresh()->sort_order)->toBe(2);
    expect($goalB->fresh()->sort_order)->toBe(1);
});

test('user can delete a goal', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $goal = Goal::factory()->create(['team_id' => $team->id]);

    $response = $this
        ->actingAs($user)
        ->delete(route('goals.destroy', [
            'current_team' => $team->slug,
            'goal' => $goal->id,
        ]));

    $response->assertRedirect();
    $this->assertDatabaseMissing('goals', ['id' => $goal->id]);
});

test('user cannot update or delete another team goal', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $otherTeam = Team::factory()->create();
    $otherGoal = Goal::factory()->create(['team_id' => $otherTeam->id]);

    $updateResponse = $this
        ->actingAs($user)
        ->put(route('goals.update', [
            'current_team' => $team->slug,
            'goal' => $otherGoal->id,
        ]), [
            'name' => 'Hacked Goal',
            'status' => 'achieved',
        ]);

    $updateResponse->assertForbidden();

    $deleteResponse = $this
        ->actingAs($user)
        ->delete(route('goals.destroy', [
            'current_team' => $team->slug,
            'goal' => $otherGoal->id,
        ]));

    $deleteResponse->assertForbidden();
});
