<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Create Project') }}
        </h2>
    </x-slot>





    <div class="container card p-5 mt-4">
      <div class="row">
        <div class="col-md-12">
          <form action="/admin/project" method="POST" >
            @csrf
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="project_id">Project ID</label>
                <input type="text" class="form-control" id="project_id" name="project_id" placeholder="Project ID">
              </div>
              <div class="form-group col-md-6">
                <label for="project_name">Project Name</label>
                <input type="text" class="form-control" id="project_name" name="project_name" placeholder="Project Name">
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" class="form-control" id="description" name="description" placeholder="Description of the Project">
            </div>

           <div class="form-row">
              <div class="form-group col-md-4">
                <label for="added_by">Added By</label>
                <input type="text" class="form-control" id="added_by" name="added_by" placeholder="Admin">
              </div>
              <div class="form-group col-md-4">
                <label for="users">User Id</label>
                <select class="form-control" id="user_id" name="user_id">
                   @foreach($users as $user)
                  <option value="{{$user->id}}" name="user_id" id="user_id">{{$user->id}}</option>
                   @endforeach
                </select>
               
              </div>
               <div class="form-group col-md-4">
                <label for="status">Status</label>
                <select class="form-control" id="status" name="status">
                  <option value="active" name="status" id="status">Active</option>
                  <option value="inactive" name="status" id="status">Inactive</option>
                  
                </select>
              </div>

            </div>

            <button type="submit" class="btn btn-success mt-2" style="color: black;">Create Project</button>
          </form>

        </div>
      </div>
    </div>



  

</x-admin-layout>
