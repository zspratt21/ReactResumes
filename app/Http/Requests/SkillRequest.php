<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'Name' => ['required'],
            'icon' => ['nullable'],
            'url' => ['nullable'],
            'priority' => ['required', 'integer'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
