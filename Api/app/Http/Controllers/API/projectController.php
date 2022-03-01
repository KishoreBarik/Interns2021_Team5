<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\project;
use Illuminate\Http\Request;
use App\Http\Resources\projectResource;
use Illuminate\Support\Facades\Validator;

class projectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = project::all();
        return response([ 'projects' => projectResource::collection($projects), 'message' => 'Retrieved successfully'],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'project_id' => 'required|max:20',
            'project_name' => 'required|max:255',
            'description' => 'required|max:255',
            'tool_id' => 'required',
            'added_by' => 'required',
            'status' => 'required'
        ]);

        if($validator->fails()){
            return response(['error' => $validator->errors(), 'Validation Error']);
        }

        $project = project::create($data);

        return response([ 'project' => new projectResource($project), 'message' => 'Created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(project $project)
    {
        //
        //return response([ 'project' => new projectResource($project), 'message' => 'Retrieved successfully'], 200);
        return new projectResource($project);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, project $project)
    {
        //
        //$project->update($request::all());

        $project->update([

            'project_id'=>$request->input('project_id'),
            'project_name'=>$request->input('project_name'),
            'description'=>$request->input('description'),
            'user_id'=>$request->input('user_id'),
            'tool_id'=>$request->input('tool_id'),
            'added_by'=>$request->input('added_by'),
            'status'=>$request->input('status'),
        ]);
        return response(['project' => new projectResource($project), 'message'=> 'Retrived successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(project $project)
    {
        //
        $project->delete();
        return response(['message'=>'deleted']);
    }
}
