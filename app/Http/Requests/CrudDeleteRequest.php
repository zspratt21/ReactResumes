<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CrudDeleteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
