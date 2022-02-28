<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $userRole = $request->user()->role()->first();
        if ($userRole) {

            // Set scope as admin/moderator based on user role
            $request->request->add([
                'scope' => $userRole->role
            ]);
        }

        if (!$request->user()->tokenCan('user')) {
            return response()->json([
                'message' => "Unauthenticated",
            ]);
        }

        return $next($request);
    }
}
