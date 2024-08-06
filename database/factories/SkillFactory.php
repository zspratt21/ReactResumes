<?php

namespace Database\Factories;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Skill>
 */
class SkillFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'url' => fake()->url(),
            'user_id' => User::factory(),
            'priority' => 0,
        ];
    }
}
