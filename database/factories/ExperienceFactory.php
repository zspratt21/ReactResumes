<?php

namespace Database\Factories;

use App\Models\Experience;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle,
            'entity' => fake()->company,
            'type' => fake()->randomElement(['experience', 'education']),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'description' => fake()->paragraph,
            'user_id' => User::factory(),
        ];
    }
}
