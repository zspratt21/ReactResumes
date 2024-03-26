<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CrudDeleteMilestoneRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required',
            'experience_id' => 'required',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
