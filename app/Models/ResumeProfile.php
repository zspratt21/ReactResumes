<?php

namespace App\Models;

use App\Traits\HasFileAttribute;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResumeProfile extends Model
{
    use HasFactory, HasFileAttribute;

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
        'introduction',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
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
        return $this->fileAttribute();
    }

    /**
     * Delete the cover photo from storage.
     */
    public function deleteCoverPhoto(): bool
    {
        return $this->deleteFile('cover_photo');
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
