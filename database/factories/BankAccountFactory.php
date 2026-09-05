<?php

namespace Database\Factories;

use App\Models\BankAccount;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BankAccount>
 */
class BankAccountFactory extends Factory
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
            'name' => ucfirst($this->faker->words(2, true)).' Account',
            'bank_name' => $this->faker->company().' Bank',
            'account_number' => $this->faker->bankAccountNumber(),
            'description' => $this->faker->sentence(),
        ];
    }
}
