<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResumeOptionsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'font' => ['required'],
            'color_scheme' => ['required'],
            'layout' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
