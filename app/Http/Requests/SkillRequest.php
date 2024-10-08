<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'icon' => ['nullable', 'image'],
            'url' => ['nullable'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
