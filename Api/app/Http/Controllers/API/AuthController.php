<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\user;
class AuthController extends Controller
{
    //

    protected function generateAccessToken($user){
        $token= $user->createToken($user->email. '-'.now());
        return $token->accessToken;
    }

    

    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email|exists:users,email',
        'password' => 'required'
    ]);

    if( auth()->attempt(['email'=>$request->email, 'password'=>$request->password]) ) {

        $user = auth()->user();
        $userRole = $user->role()->first();

        if ($userRole) {
            $this->scope = $userRole->role;
        }

        $token = $user->createToken($user->email.'-'.now());

        return response()->json([
            'message'=>'Success',
            'user'=>$user,
            'token' => $token->accessToken
        ]);
    }
}
}