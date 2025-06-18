<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use App\Models\WebUser;
use App\Rules\SignUp_EmailValidator as RulesSignUp_EmailValidator;
use Illuminate\Validation\Rule;
use SignUp_EmailValidator;

class StoreWebUserPostRequest extends FormRequest
{

    protected $stopOnFirstFailure = true;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => [
                'required',
                new RulesSignUp_EmailValidator,
                'email'
            ],
            'password' => ['required'],
            'name' => ['required']
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Es necesario llenar el campo de email.',
            'password.required' => 'Es necesario llenar el campo de contraseña.',
            'name.required' => 'Es necesario llenar el campo de nombre'
        ];
    }
}
