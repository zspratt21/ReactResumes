<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Experience extends Model
{
    protected $fillable = [
        'title',
        'entity',
        'type',
        'start_date',
        'end_date',
        'description',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('Y-m-d');
    }

    public function milestones(): HasMany
    {
        return $this->hasMany(Milestone::class)->orderBy('priority');
    }

    public function image(): Attribute
    {
        return new Attribute(function ($value) {
            return $value ? env('APP_DISK_URL').'/'.$value : null;
        });
    }

    /**
     * Delete the image from storage.
     */
    public function deleteImage(): bool
    {
        if (! $this->getRawOriginal('image')) {
            return true;
        }

        return Storage::disk(env('APP_DISK', 's3'))->delete($this->getRawOriginal('image'));
    }

    /**
     * Delete the experience and it's associated image from storage.
     */
    public function delete()
    {
        $this->deleteImage();
        $this->milestones()->delete();

        return parent::delete();
    }

    protected function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
