<?php

namespace App\Http\Middleware;

use App\Models\WebUser;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SysAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() == false)
            return redirect('');

        $idprofiletype = Auth::user()->ID_ProfileType;

        if ($idprofiletype == WebUser::ID_SysAdmin || $idprofiletype == WebUser::ID_Admin) {
            return $next($request);
        }

        return redirect('');
    }
}
