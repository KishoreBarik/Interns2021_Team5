<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->prefix('v1')->group(function(){

    Route::get('/user',function(Request $request){
        return $request->user();
    });
});





Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';



// Admin Routes


Route::namespace('Admin')->prefix('admin')->name('admin.')->group(function(){
    Route::namespace('Auth')->middleware('guest:admin')->group(function(){

        // login route
        Route::get('login','AuthenticatedSessionController@create')->name('login');
        Route::post('login','AuthenticatedSessionController@store')->name('adminlogin');

    });
    Route::middleware('admin')->group(function(){
         Route::get('dashboard','HomeController@index')->name('dashboard');
         Route::resource('/project',ProjectsController::class);
         Route::resource('/user',UsersController::class);
         Route::resource('/tool',ToolsController::class);
          Route::resource('/projectaccess',ProjectAccessController::class);
       
    });

     Route::post('logout','Auth\AuthenticatedSessionController@destroy')->name('logout');
});
