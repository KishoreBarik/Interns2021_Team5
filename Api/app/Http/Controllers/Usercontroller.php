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

    public function forgetPassword(Request $request ,$id){

        $request->validate([
            'new_password' => 'required|min:6|max:16',
            'cof_password' => 'required|min:6|max:16'
        ]);

        if($request->new_password === $request->cof_password){

            User::whereId($id)->update([
                'password' => Hash::make($request->new_password)
            ]);

            return [
                'message' => 'Password Reset Successfully '
            ];
        }

        return [
            'message' => 'Password Didnt Match !! '
             
        ];
    }

    public function changePassword(Request $request , $id){
        $request->validate([
            'new_password' => 'required|min:6|max:16',
            'cof_password' => 'required|min:6|max:16'
        ]);

        if($request->new_password === $request->cof_password){

            User::whereId($id)->update([
                'password' => Hash::make($request->new_password)
            ]);

            return [
                'message' => 'Password Changed Successfully '
            ];
        }

        return [
            'message' => 'Password Didnt Match !! '
             
        ];
    }
    


}

