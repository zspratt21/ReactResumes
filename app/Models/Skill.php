<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'icon',
        'url',
        'priority',
    ];

    protected function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
