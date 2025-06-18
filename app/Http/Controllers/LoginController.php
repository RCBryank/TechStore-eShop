<?php

namespace App\Http\Controllers;

use App\Models\WebUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    //
    public function Login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], ['email.required' => 'Es necesario especificar un email.']);

        if (Auth::attempt(['email' => $credentials["email"], 'password' => $credentials["password"]], LoginController::CONST_Remember)) {
            $result = WebUser::select('ID')->where('Email', $credentials['email'])->first();

            $request->session()->put("ID_WebUser", $result['ID']);
            $request->session()->regenerate();

            return redirect()->to("/inicio");
        }

        return back()->withErrors([
            'email' => 'No existe un usuario con las credenciales especificadas o estas son incorrectas.',
        ])->onlyInput('email');
    }

    const CONST_Remember = true;
}
