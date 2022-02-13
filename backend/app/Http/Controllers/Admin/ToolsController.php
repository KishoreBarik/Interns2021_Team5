<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Project,User};

use App\Models\Tools;

class ToolsController extends Controller
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
        $tools = Tools::get();
        //dd($project);

        return view('admin.tools.index',[

            'projects' => $projects,
            'tools' => $tools

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
        $tools = Tools::get();
        //dd($project);

        return view('admin.tools.create',[

            'projects' => $projects,
            'tools' => $tools

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

        $tools = Tools::create([

            'project_id'=>$request->input('project_id'),
            'tool_id'=>$request->input('tool_id'),
            'tool_name'=>$request->input('tool_name'),
            'description'=>$request->input('description'),
            'url'=>$request->input('url'),
            'status'=>$request->input('status')

        ]);
        return redirect('admin/tool');
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

         $tools = Tools::find($id);
         $project = Project::get();
        //dd($project);

        return view('admin.tools.edit',[

            'project' => $project,
            'tools' => $tools

        ]);



         return redirect('admin/tool');


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

         $tools = Tools::where('tool_id',$id)
         ->update([
             'project_id'=>$request->input('project_id'),
            'tool_id'=>$request->input('tool_id'),
            'tool_name'=>$request->input('tool_name'),
            'description'=>$request->input('description'),
            'url'=>$request->input('url'),
            'status'=>$request->input('status')
        ]);

        return redirect('admin/tool');


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

        $tools = Tools::find($id);

        $tools->delete();

        return redirect('admin/tool');



    }
}
