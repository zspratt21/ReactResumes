<?php

namespace App\Models;

use App\Traits\HasFileAttribute;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Experience extends Model
{
    use HasFactory, HasFileAttribute;

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
        return $this->fileAttribute();
    }

    /**
     * Delete the image from storage.
     */
    public function deleteImage(): bool
    {
        return $this->deleteFile('image');
    }

    /**
     * Delete the experience and it's associated image from storage.
     */
    public function delete(): ?bool
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
