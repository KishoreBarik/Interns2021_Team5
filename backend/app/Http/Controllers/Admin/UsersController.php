<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $users = User::get();
        //dd($project);

        return view('admin.users.index',[

            'users' => $users

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
         return view('admin.users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $user = User::create([

            'name'=>$request->input('name'),
            'first_name'=>$request->input('first_name'),
            'last_name'=>$request->input('last_name'),
            'gender'=>$request->input('gender'),
            'dob'=>$request->input('dob'),
            'status'=>$request->input('status'),
            'email'=>$request->input('email'),
            'password'=>$request->input('password'),


        ]);
        return redirect('admin/user');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($email)
    {
        //
        $users = User::find($email);
        
        //dd($users);

        return view('admin.users.edit',[

            'users' => $users

        ]);



         return redirect('admin/user');

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //


        $user = User::where('id',$id)

         ->update([
           'name'=>$request->input('name'),
            'first_name'=>$request->input('first_name'),
            'last_name'=>$request->input('last_name'),
            'gender'=>$request->input('gender'),
            'dob'=>$request->input('dob'),
            'status'=>$request->input('status'),
            'email'=>$request->input('email'),
            'password'=>$request->input('password'),

        ]);

        //dd($user);

        return redirect('admin/user');



    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {       
        $user = User::find($id);
        //dd($user);

        $user->delete();

        return redirect('admin/user');

    }
}
