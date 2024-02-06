<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ResumeProfile extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'address',
        'mobile',
        'linkedin',
        'github',
        'twitter',
        'instagram',
        'salesforce',
        'cover_photo',
        'introduction',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'user_id',
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Append the disk URL to the cover photo url when accessed.
     */
    public function coverPhoto(): Attribute
    {
        return new Attribute(function ($value) {
            return $value ? env('APP_DISK_URL').'/'.$value : null;
        });
    }

    /**
     * Delete the cover photo from storage.
     */
    public function deleteCoverPhoto(): bool
    {
        if (! $this->getRawOriginal('cover_photo')) {
            return true;
        }

        return Storage::disk('public')->delete($this->getRawOriginal('cover_photo'));
    }

    /**
     * Delete the profile and its associated cover photo from storage.
     */
    public function delete(): bool
    {
        $this->deleteCoverPhoto();

        return parent::delete();
    }
}
