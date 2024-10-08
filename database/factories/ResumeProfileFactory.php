<?php

namespace Database\Factories;

use App\Models\ResumeProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ResumeProfile>
 */
class ResumeProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'address' => fake()->address(),
            'mobile' => fake()->phoneNumber(),
            'linkedin' => fake()->url(),
            'github' => fake()->url(),
            'twitter' => fake()->url(),
            'instagram' => fake()->url(),
            'salesforce' => fake()->url(),
            'introduction' => fake()->paragraph(),
            'user_id' => User::factory(),
        ];
    }
}
