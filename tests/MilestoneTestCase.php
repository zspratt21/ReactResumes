<?php

namespace Tests;

use App\Models\Experience;

abstract class MilestoneTestCase extends ResumeCrudTestCase
{
    protected Experience $experience;

    protected function setUp(): void
    {
        parent::setUp();
        $this->experience = Experience::factory()->create(['user_id' => $this->user->id]);
    }

    protected function example(array $overrides = []): array
    {
        $milestone = [
            'experience_id' => $this->experience->id,
            'name' => 'Milestone 1',
            'description' => 'I did something important.',
        ];

        return array_merge($milestone, $overrides);
    }
}
