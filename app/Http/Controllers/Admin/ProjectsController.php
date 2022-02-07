<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Project,User};

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        $projects = Project::get();
        $users = User::get();
        //dd($project);

        return view('admin.projects.index',[

            'projects' => $projects,
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

        $projects = Project::get();
        $users = User::get();
        //dd($project);

        return view('admin.projects.create',[

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

        $project = Project::create([

            'project_id'=>$request->input('project_id'),
            'project_name'=>$request->input('project_name'),
            'description'=>$request->input('description'),
            'user_id'=>$request->input('user_id'),
            'added_by'=>$request->input('added_by'),
            'status'=>$request->input('status')

        ]);
        return redirect('admin/project');
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

        //$project = Project::find($id)->first();


        //dd($project);
        //return view('admin.projects.edit')->with('project',$project);

        $project = Project::find($id);
        $users = User::get();
        //dd($project);

        return view('admin.projects.edit',[

            'project' => $project,
            'users' => $users

        ]);



         return redirect('admin/project');

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

         $project = Project::where('project_id',$id)
         ->update([
            'project_id'=>$request->input('project_id'),
            'project_name'=>$request->input('project_name'),
            'description'=>$request->input('description'),
            'user_id'=>$request->input('user_id'),
            'added_by'=>$request->input('added_by'),
            'status'=>$request->input('status')

        ]);

        return redirect('admin/project');


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //


        //dd($id);

        $project = Project::find($id);

        $project->delete();

        return redirect('admin/project');

    }
}
