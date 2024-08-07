<?php

namespace Tests;

abstract class ResumeProfileTestCase extends ResumeCrudTestCase
{
    protected function example(array $overrides = []): array
    {
        $resume_profile = [
            'address' => '123 Main St.',
            'mobile' => '123456789',
            'linkedin' => 'https://www.linkedin.com/in/amazingprofile/',
            'github' => 'https://www.github.com/amazingprofile/',
            'twitter' => 'https://www.twitter.com/amazingprofile/',
            'instagram' => 'https://www.instagram.com/amazingprofile/',
            'salesforce' => 'https://www.salesforce.com/amazingprofile/',
            'introduction' => 'I make cool stuff.',
        ];

        return array_merge($resume_profile, $overrides);
    }
}
