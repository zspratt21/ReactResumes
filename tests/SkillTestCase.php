<?php

namespace Tests;

abstract class SkillTestCase extends ResumeCrudTestCase
{
    protected function example(array $overrides = []): array
    {
        $skill = [
            'name' => 'Laravel',
            'url' => 'https://laravel.com/',
        ];

        return array_merge($skill, $overrides);
    }
}
