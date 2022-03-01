<?php

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\projectController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\projectaccessController;
use App\Http\Controllers\API\toolController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::post('/register', 'API/AuthController@register');
//Route::post('/login', 'API/AuthController@login');
//Route::get('/user', 'API/AuthController@user')->middleware('auth:api');
//Route::post('/forgot','API/AuthController@forgot');
Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');

Route::middleware('auth:api')->group(function(){
    Route::middleware(['scope:admin, user'])->get('users', function(Request $request){
        return User::get();
    });

});
Route::middleware('auth:api')->group(function() {

    Route::get('user/{userId}/detail', 'UserController@show');
});
Route::middleware(['auth:api', 'role'])->group(function() {

    // List users
    Route::middleware(['scope:admin,user'])->get('/users', function (Request $request) {
        if($request->user()->tokenCan('user')){
            return User::get();

        }

        return $request->user();
    });

    // Add/Edit User
    Route::middleware(['scope:admin'])->post('/user', function(Request $request) {

        return User::create($request->all());
    });

    Route::middleware(['scope:admin, user'])->put('/user/{userId}', function(Request $request, $userId) {

        try {
            $user = User::findOrFail($userId);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User not found.'
            ], 403);
        }

        $user->update($request->all());

        return response()->json(['message'=>'User updated successfully.']);
    });

    // Delete User
    Route::middleware(['scope:admin'])->delete('/user/{userId}', function(Request $request, $userId) {

        try {
            $user = User::findOfFail($userId);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User not found.'
            ], 403);
        }

        $user->delete();

        return response()->json(['message'=>'User deleted successfully.']);
    });
});
Route::middleware('auth:api')->group(function() {

Route::get('user', 'AuthController@show');
});

Route::apiResource('/project', 'API\projectController')->middleware('auth:api');

Route::apiResource('/projectaccess', 'API\projectaccessController')->middleware('auth:api');


Route::apiResource('/tool', 'API\toolController')->middleware('auth:api');


