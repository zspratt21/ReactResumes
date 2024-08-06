<?php

namespace Tests;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

abstract class ResumeCrudTestCase extends TestCase
{
    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('resume');
        $this->user = User::factory()->create();
    }
}
