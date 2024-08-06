<?php

namespace Database\Factories;

use App\Models\Experience;
use App\Models\Milestone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Milestone>
 */
class MilestoneFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(fake()->numberBetween(1, 7), true),
            'description' => fake()->paragraph,
            'experience_id' => Experience::factory(),
            'priority' => 0,
        ];
    }
}
