<?php

namespace Database\Factories;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * @extends Factory<Skill>
 */
class SkillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        Storage::fake(config('filesystems.default'));
        $name = fake()->word();
        $time = now()->timestamp;
        $icon_file = UploadedFile::fake()->image("{$name} {$time}.png");
        $icon_path = $icon_file->store('/users/skills');

        return [
            'name' => $name,
            'icon' => $icon_path,
            'url' => fake()->url(),
            'user_id' => User::factory(),
            'priority' => 0,
        ];
    }
}
