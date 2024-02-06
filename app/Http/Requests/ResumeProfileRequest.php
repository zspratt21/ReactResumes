<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResumeProfileRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'address' => ['required'],
            'mobile' => ['nullable'],
            'linkedin' => ['nullable'],
            'github' => ['nullable'],
            'twitter' => ['nullable'],
            'instagram' => ['nullable'],
            'salesforce' => ['nullable'],
            'cover_photo' => ['nullable', 'image', 'max:2048'],
            'introduction' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
