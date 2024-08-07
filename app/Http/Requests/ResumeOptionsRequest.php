<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResumeOptionsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'font' => ['string'],
            'color_scheme' => ['string'],
            'layout' => ['string'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
