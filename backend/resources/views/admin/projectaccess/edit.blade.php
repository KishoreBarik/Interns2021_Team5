<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Grant Project Access') }}
        </h2>
    </x-slot>





    <div class="container card p-5 mt-4">
      <div class="row">
        <div class="col-md-12">
          <form action="/admin/projectaccess/{{$proacc->access_id}}" method="POST" >
            @csrf
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="access_id">Access Id</label>
                <input type="text" class="form-control" id="access_id" name="access_id" value="{{$proacc->access_id}}">
              </div>
              <div class="form-group col-md-6">
                <label for="project">Project Id</label>
                <select class="form-control" id="project_id" name="project_id">
                   @foreach($projects as $project)
                  <option value="{{$project->project_id}}" name="project_id" id="project_id">{{$project->project_id}}</option>
                   @endforeach
                </select>
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
            <button type="submit" class="btn btn-success mt-2" style="color: black;">Grant Access</button>
          </form>

        </div>
      </div>
    </div>



  

</x-admin-layout>
