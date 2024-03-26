<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Milestone extends Model
{
    protected $fillable = [
        'name',
        'description',
        'priority',
    ];

    protected function experience(): BelongsTo
    {
        return $this->belongsTo(Experience::class);
    }
}
