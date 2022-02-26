<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Project,User,Projectaccess};


class ProjectaccessController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
        $projectaccess = Projectaccess::get();
        //dd($project);
         $projects = Project::get();
        $users = User::get();
        //dd($project);

        return view('admin.projectaccess.index',[

           
            'projectaccess'=>$projectaccess,
            'projects'=>$projects

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
         $projects = Project::get();
        $users = User::get();
        //dd($project);

        return view('admin.projectaccess.create',[

            'projects' => $projects,
            'users' => $users

        ]);
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
        $proacc = Projectaccess::create([
            'access_id'=>$request->input('access_id'),
            'project_id'=>$request->input('project_id'),
            'user_id'=>$request->input('user_id'),
            'status'=>$request->input('status')

        ]);
        return redirect('admin/projectaccess');

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
    public function edit($id)
    {
        //

        $proacc = Project::find($id);
        $projects = Project::get();
        $users = User::get();
        //dd($project);

        return view('admin.projectaccess.edit',[
            'proacc'=>$proacc,
            'projects' => $projects,
            'users' => $users

        ]);
        return redirect('admin/projectaccess');


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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($access_id)
    {
        //
         $proacc = Projectaccess::find($access_id);

        $proacc->delete();

        return redirect('admin/projectaccess');
    }
}
