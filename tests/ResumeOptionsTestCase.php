<?php

namespace Tests;

abstract class ResumeOptionsTestCase extends ResumeCrudTestCase
{
    protected function example(array $overrides = []): array
    {
        $resume_options = [
            'font' => 'font-roboto',
            'color_scheme' => 'dark',
            'layout' => 'Classic',
        ];

        return array_merge($resume_options, $overrides);
    }
}
