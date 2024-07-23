<?php

namespace App\Models;

use App\Traits\HasFileAttribute;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    use HasFileAttribute;

    protected $fillable = [
        'name',
        'icon',
        'url',
        'priority',
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
        return $this->deleteFile('icon');
    }

    /**
     * Delete the skill and its icon from storage.
     */
    public function delete(): bool
    {
        $this->deleteIcon();

        return parent::delete();
    }
}
