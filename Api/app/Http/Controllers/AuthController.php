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

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required|min:6'
        ]);


        $user = User::create([
            'name' => $request->name, 
            'email' => $request->email, 
            'password' => bcrypt($request->password)
        ]);

        return response()->json($user);
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

public function user()
{
    # code...
    return Auth()->user();
}


/**
    * Logout Auth User
    *
    * @param Request $request
    * @return void
    */
    public function logout() {

        if(Auth()->check()) {
            Auth()->user()->token()->revoke();
            return response()->json(["status" => "success", "error" => false, "message" => "Success! You are logged out."], 200);
        }
        return response()->json(["status" => "failed", "error" => true, "message" => "Failed! You are already logged out."], 403);
    }

}