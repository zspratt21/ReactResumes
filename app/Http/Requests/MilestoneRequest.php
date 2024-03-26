<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MilestoneRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'description' => ['required'],
            'experience_id' => ['required', 'exists:experiences,id'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
