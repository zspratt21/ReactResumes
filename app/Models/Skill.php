<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Skill extends Model
{
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
        return new Attribute(function ($value) {
            return $value ? env('APP_DISK_URL').'/'.$value : null;
        });
    }

    public function deleteIcon(): bool
    {
        // @todo consider keeping this order or order of resume profile
        if ($this->getRawOriginal('icon')) {
            return Storage::disk(env('APP_DISK', 's3'))->delete($this->getRawOriginal('icon'));
        }

        return true;
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
