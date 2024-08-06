<?php

namespace App\Models;

use App\Traits\HasFileAttribute;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    use HasFactory, HasFileAttribute;

    protected $fillable = [
        'name',
        'url',
    ];

    protected $hidden = [
        'user_id',
    ];

    protected function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function icon(): Attribute
    {
        return $this->fileAttribute();
    }

    public function deleteIcon(): bool
    {
        $delete = $this->deleteFile('icon');
        if ($delete) {
            $this->icon = null;
            $this->save();
        }

        return $delete;
    }

    /**
     * Delete the skill and its icon from storage.
     */
    public function delete(): bool
    {
        $this->deleteIcon();

        return parent::delete();
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($skill) {
            $skill->priority = $skill->user->skills()->count();
        });
    }
}
