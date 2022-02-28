<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected function generateAccessToken($user){
        $token= $user->createToken($user->email. '-'.now());
        return $token->accessToken;
    }
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        $validatedData['password'] = bcrypt($request->password);

        $user = User::create($validatedData);

        $accessToken = $user->createToken('authToken')->accessToken;

        return response([ 'user' => $user, 'access_token' => $accessToken]);
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

        $token = $user->createToken($user->email.'-'.now(), [
            $userRole->role
        ]);

        return response()->json([
            'message'=>'Success',
            'user'=>$user,
            'token' => $token->accessToken
        ]);
    }
}

public function user(){
    return Auth::user();
}

public function forgot(ForgotRequest $request){
    $email = $request->input(key: 'email');



    if (User::where('email', $email)->doesntExist()){
        return response([
            'message'=>'user doestn\t exit'], status:400);
    }
        

    $token= Str::random(length:10);
    try{

        DB::table(table: 'password-resets')->insert([
            'email'=>$email,
            'token'=>$token
        ]);

        //send email
        return response([
            'message'=>'check the email!'
        ]);

        }
        catch(\Exception $exception){
            return response([
                'message' => $exception->getmessage()
            ], status:400);
        }
}


}
