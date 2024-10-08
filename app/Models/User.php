<?php

namespace App\Models;

use App\Traits\HasFileAttribute;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, HasFileAttribute, Notifiable, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'two_factor_secret' => 'encrypted',
        'two_factor_recovery_codes' => 'encrypted',
    ];

    /**
     * Append the disk URL to the avatar url when accessed.
     */
    protected function avatar(): Attribute
    {
        return $this->fileAttribute();
    }

    /**
     * Deletes the user's avatar from storage.
     */
    public function deleteAvatar(): bool
    {
        return $this->deleteFile('avatar');
    }

    /**
     * Deletes the user and their associated avatar from storage.
     */
    public function delete(): bool
    {
        $this->deleteAvatar();
        $this->skills()->delete();
        $this->experiences()->delete();
        $this->resumeProfile()->delete();
        $this->resumeOptions()->delete();

        return parent::delete();
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, string>
     */
    public function toSearchableArray(): array
    {
        $array = $this->toArray();

        return [
            'name' => $array['name'],
            'email' => $array['email'],
        ];
    }

    /**
     * Get the user's resume profile.
     */
    public function resumeProfile(): HasOne
    {
        return $this->hasOne(ResumeProfile::class);
    }

    /**
     * Get the user's resume options.
     */
    public function resumeOptions(): HasOne
    {
        return $this->hasOne(ResumeOptions::class);
    }

    /**
     * Get the user's skills.
     */
    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class)->orderBy('priority');
    }

    /**
     * Get the user's experiences.
     */
    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class)->orderBy('start_date', 'desc');
    }

    protected static function boot(): void
    {
        parent::boot();

        static::created(function ($user) {
            $user->resumeOptions()->create();
        });
    }
}
