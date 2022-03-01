<?php

namespace App\Http\Controllers;
use App\Http\Controllers\AuthController;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //
    public function show(Request $request, $userId)
    {


        
        $user = User::find($userId);
        //return json($user);

         if($user) {
            return response()->json($user);
         }

         return response()->json(['message' => 'User not found!'], 404);
    }

}
