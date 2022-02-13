<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Update Tool') }}
        </h2>
    </x-slot>





    <div class="container card p-5 mt-4">
      <div class="row">
        <div class="col-md-12">
          <form action="/admin/tool/{{$tools->tool_id}}" method="POST" >
            @csrf

            @method('PUT')
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="project_id">Project Id</label>
                <select class="form-control" id="project_id" name="project_id">
                   @foreach($project as $project)
                  <option value="{{$project->project_id}}" name="project_id" id="project_id">{{$project->project_id}}</option>
                   @endforeach
                </select>
              </div>
              <div class="form-group col-md-4">
                <label for="tool_id">Tool ID</label>
                <input type="text" class="form-control" id="tool_id" name="tool_id" value="{{$tools->tool_id}}">
              </div>
              <div class="form-group col-md-4">
                <label for="tool_name">Tool Name</label>
                <input type="text" class="form-control" id="tool_name" name="tool_name" value="{{$tools->tool_name}}">
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" class="form-control" id="description" name="description" value="{{$tools->description}}">
            </div>

           <div class="form-row">
            <div class="form-group col-md-4">
                <label for="url">URL</label>
                <input type="text" class="form-control" id="url" name="url" value="{{$tools->url}}">
              </div>
               <div class="form-group col-md-4">
                <label for="status">Status</label>
                <select class="form-control" id="status" name="status">
                  <option value="active" name="status" id="status">Active</option>
                  <option value="inactive" name="status" id="status">Inactive</option>
                  
                </select>
              </div>

            </div>

            <button type="submit" class="btn btn-success mt-2" style="color: black;">Update Project</button>
          </form>

        </div>
      </div>
    </div>



  

</x-admin-layout>
