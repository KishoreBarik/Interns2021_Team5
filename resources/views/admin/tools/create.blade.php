<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Create Tool') }}
        </h2>
    </x-slot>





    <div class="container card p-5 mt-4">
      <div class="row">
        <div class="col-md-12">
          <form action="/admin/tool" method="POST" >
            @csrf
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="project_id">Project Id</label>
                <select class="form-control" id="project_id" name="project_id">
                   @foreach($projects as $project)
                  <option value="{{$project->project_id}}" name="project_id" id="project_id">{{$project->project_id}}</option>
                   @endforeach
                </select>
               
              </div>
              <div class="form-group col-md-4">
                <label for="project_id">Tool ID</label>
                <input type="text" class="form-control" id="tool_id" name="tool_id" placeholder="Tool ID">
              </div>
              <div class="form-group col-md-4">
                <label for="project_name">Tool Name</label>
                <input type="text" class="form-control" id="tool_name" name="tool_name" placeholder="Tool Name">
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" class="form-control" id="description" name="description" placeholder="Description of the Tool">
            </div>
            

           <div class="form-row">
            <div class="form-group col-md-6 ">
              <label for="url">URL</label>
              <input type="text" class="form-control" id="url" name="url" placeholder="Enter URL of the TOOL">
            </div>
              
               <div class="form-group col-md-6">
                <label for="status">Status</label>
                <select class="form-control" id="status" name="status">
                  <option value="active" name="status" id="status">Active</option>
                  <option value="inactive" name="status" id="status">Inactive</option>
                  
                </select>
              </div>

            </div>

            <button type="submit" class="btn btn-success mt-2" style="color: black;">Create Tool</button>
          </form>

        </div>
      </div>
    </div>



  

</x-admin-layout>
