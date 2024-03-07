<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class SkillPriorityRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'priorities' => ['required', 'array'],
            'priorities.*.id' => ['required', 'numeric'],
            'priorities.*.priority' => ['required', 'numeric'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'data' => $this->request->all(),
            'errors' => $validator->errors(),
        ], 422));
    }
}
