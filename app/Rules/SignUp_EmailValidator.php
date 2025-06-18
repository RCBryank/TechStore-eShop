<?php

namespace App\Rules;

use App\Models\WebUser;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SignUp_EmailValidator implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $result = WebUser::where('Email', $value)->first();

        if (is_null($result) == false)
            $fail("El email especificado ya se encuentra en uso.");
    }
}
