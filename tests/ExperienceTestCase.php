<?php

namespace Tests;

abstract class ExperienceTestCase extends ResumeCrudTestCase
{
    protected function example(array $overrides = []): array
    {
        $experience = [
            'title' => 'Software Developer',
            'entity' => 'Google',
            'type' => 'experience',
            'start_date' => '2020-01-01',
            'end_date' => '2021-01-02',
            'description' => 'I worked as a software developer at Google.',
        ];

        return array_merge($experience, $overrides);
    }
}
