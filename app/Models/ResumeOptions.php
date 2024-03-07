<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResumeOptions extends Model
{
    protected $fillable = [
        'font',
        'color_scheme',
        'layout',
        'user_id',
    ];

    protected $hidden = [
        'id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
