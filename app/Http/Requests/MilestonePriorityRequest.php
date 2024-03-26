<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class MilestonePriorityRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'experience_id' => ['required', 'exists:experiences,id'],
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
