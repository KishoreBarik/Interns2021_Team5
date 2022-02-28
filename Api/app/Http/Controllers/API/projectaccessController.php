<?php

namespace App\Http\Controllers\API;

use App\Models\projectaccess;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\projectResource;
use Illuminate\Support\Facades\Validator;

class projectaccessController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $projectaccesss=projectaccess::all();
        return response(['projectaccesss' => projectaccessResource::collection($projectaccesss), 'message' =>'Retrived Successfully'], 200);
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

        $data = $request->all();

        $validator = Validator::make($data, [
            'user_id' => 'required|max:255',
            'access_id' => 'required|max:255',
            'project_id' => 'required|max:255',
            'status' => 'required'
        ]);

        if($validator->fails()){
            return response(['error' => $validator->errors(), 'Validation Error']);
        }

        $projectaccess = projectaccess::create($data);

        return response([ 'projectaccess' => new projectaccessResource($projectaccess), 'message' => 'Created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\projectaccess  $projectaccess
     * @return \Illuminate\Http\Response
     */
    public function show(projectaccess $projectaccess)
    {
        //
        return response(['projectaccess' => projectaccessResource($projectaccess), 'message'=>'Retrieved successfully'], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\projectaccess  $projectaccess
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, projectaccess $projectaccess)
    {
        //
        $projectaccess->update($request->all());

        return response([ 'projectaccess' => new projectaccessResource($projectaccess), 'message' => 'Retrieved successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\projectaccess  $projectaccess
     * @return \Illuminate\Http\Response
     */
    public function destroy(projectaccess $projectaccess)
    {
        //
        $projectaccess->delete();
        return response(['message'=>'deleted']);
    }
}
