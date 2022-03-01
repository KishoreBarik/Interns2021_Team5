<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\tool;
use Illuminate\Http\Request;
use App\Http\Resources\toolResource;
use Illuminate\Support\Facades\Validator;


class toolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $tools = tool::all();
        return response([ 'tools' => toolResource::collection($tools), 'message' => 'Retrieved successfully'], 200);
    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $tool=tool::create([

            'tool_id'=>$request->input('tool_id'),
            'tool_name'=>$request->input('tool_name'),
            'description'=>$request->input('description'),
            'project_id'=>$request->input('project_id'),
            'url'=>$request->input('url'),
            'status'=>$request->input('status'),
        ]);
        return response(['tool' => new projectResource($tool), 'message'=> 'Retrived successfully'], 200);


        // $data = $request::all();

        // $validator= Validator::make($data,[
        //     'tool_id' =>'required|max:255',
        //     'tool_name' =>'required|max:255',
        //     'description'=>'required|max:255',
        //     'project_id'=>'required',
        //     'url' => 'required|max:255',
        //     'stastus'=>'required'

        // ]);

        // if($validator->fails()){
        //     return response(['error' => $validator->errors(), 'Validation Error']);
        // }

        // $tool = tool::create($data);

        // return response([ 'tool' => new toolResource($tool), 'message' => 'Created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tool  $tool
     * @return \Illuminate\Http\Response
     */
    public function show(tool $tool)
    {
        return response([ 'tool' => new toolResource($tool), 'message' => 'Retrieved successfully'], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tool  $tool
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, tool $tool)
    {
        $tool->update($request->all());

        return response([ 'tool' => new toolResource($tool), 'message' => 'Retrieved successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tool  $tool
     * @return \Illuminate\Http\Response
     */
    public function destroy(tool $tool)
    {
        $tool->delete();
        return response(['message' => 'Deleted']);
    }
}
