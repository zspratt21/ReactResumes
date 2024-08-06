<?php

namespace Tests;

abstract class ResumeOptionsTestCase extends ResumeCrudTestCase
{
    protected function example(array $overrides = []): array
    {
        $resume = [
            'font' => 'font-roboto',
            'color_scheme' => 'dark',
            'layout' => 'Modern',
        ];

        return array_merge($resume, $overrides);
    }
}
