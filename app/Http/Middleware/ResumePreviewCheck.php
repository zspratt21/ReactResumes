<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ResumePreviewCheck
{
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user() && $request->chrome_key != env('CHROMIUM_KEY')) {
            return redirect()->route('login');
        }

        return $next($request);
    }
}
