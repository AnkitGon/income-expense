<?php

use App\Models\Category;
use App\Models\Team;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('categories.index', ['current_team' => 'test-team']));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the categories page', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this
        ->actingAs($user)
        ->get(route('categories.index', ['current_team' => $team->slug]));

    $response->assertOk();
});

test('categories page lists categories belonging to the user\'s active team', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $categoryInTeam = Category::factory()->create([
        'team_id' => $team->id,
        'name' => 'Active Team Category',
    ]);

    $otherTeam = Team::factory()->create();
    $categoryInOtherTeam = Category::factory()->create([
        'team_id' => $otherTeam->id,
        'name' => 'Other Team Category',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('categories.index', ['current_team' => $team->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('categories/index')
        ->has('categories.data', 1)
        ->where('categories.data.0.name', 'Active Team Category')
    );
});

test('categories page can be searched', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    Category::factory()->create([
        'team_id' => $team->id,
        'name' => 'Food & Groceries',
    ]);

    Category::factory()->create([
        'team_id' => $team->id,
        'name' => 'Monthly Electricity',
    ]);

    $response = $this
        ->actingAs($user)
        ->get(route('categories.index', [
            'current_team' => $team->slug,
            'search' => 'Food',
        ]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('categories/index')
        ->has('categories.data', 1)
        ->where('categories.data.0.name', 'Food & Groceries')
    );
});

test('user can create a category', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $response = $this
        ->actingAs($user)
        ->post(route('categories.store', ['current_team' => $team->slug]), [
            'name' => 'New Category',
            'description' => 'New Description',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('categories', [
        'team_id' => $team->id,
        'name' => 'New Category',
        'description' => 'New Description',
    ]);
});

test('user can update a category', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $category = Category::factory()->create([
        'team_id' => $team->id,
        'name' => 'Old Name',
        'description' => 'Old Description',
    ]);

    $response = $this
        ->actingAs($user)
        ->put(route('categories.update', [
            'current_team' => $team->slug,
            'category' => $category->id,
        ]), [
            'name' => 'Updated Name',
            'description' => 'Updated Description',
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Updated Name',
        'description' => 'Updated Description',
    ]);
});

test('user cannot update another team\'s category', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $otherTeam = Team::factory()->create();
    $category = Category::factory()->create([
        'team_id' => $otherTeam->id,
        'name' => 'Other Name',
    ]);

    $response = $this
        ->actingAs($user)
        ->put(route('categories.update', [
            'current_team' => $team->slug,
            'category' => $category->id,
        ]), [
            'name' => 'Hack Attempt',
        ]);

    $response->assertForbidden();
    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Other Name',
    ]);
});

test('user can delete a category', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $category = Category::factory()->create([
        'team_id' => $team->id,
    ]);

    $response = $this
        ->actingAs($user)
        ->delete(route('categories.destroy', [
            'current_team' => $team->slug,
            'category' => $category->id,
        ]));

    $response->assertRedirect();
    $this->assertDatabaseMissing('categories', [
        'id' => $category->id,
    ]);
});

test('user cannot delete another team\'s category', function () {
    $user = User::factory()->create();
    $team = $user->currentTeam;

    $otherTeam = Team::factory()->create();
    $category = Category::factory()->create([
        'team_id' => $otherTeam->id,
    ]);

    $response = $this
        ->actingAs($user)
        ->delete(route('categories.destroy', [
            'current_team' => $team->slug,
            'category' => $category->id,
        ]));

    $response->assertForbidden();
    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
    ]);
});
