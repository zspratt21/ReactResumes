<?php

namespace Tests;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

abstract class ResumeCrudTestCase extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake(config('filesystems.default'));
        $this->user = User::factory()->create();
    }
}
