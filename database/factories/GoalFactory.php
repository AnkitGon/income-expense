<?php

namespace Database\Factories;

use App\Models\Goal;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Goal>
 */
class GoalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'team_id' => Team::factory(),
            'name' => ucfirst($this->faker->words(2, true)),
            'description' => $this->faker->sentence(),
            'status' => 'pending',
            'achieved_at' => null,
            'sort_order' => $this->faker->numberBetween(0, 100),
        ];
    }

    /**
     * Mark the goal as achieved.
     */
    public function achieved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'achieved',
            'achieved_at' => now(),
        ]);
    }
}
