<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Milestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    protected function experience(): BelongsTo
    {
        return $this->belongsTo(Experience::class);
    }

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function (Milestone $milestone) {
            $milestone->priority = $milestone->experience->milestones()->count();
        });
    }
}
