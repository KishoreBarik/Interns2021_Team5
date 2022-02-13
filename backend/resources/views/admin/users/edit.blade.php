<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Update Users') }}
        </h2>
    </x-slot>


    <div class="container card p-5 mt-4">
      <div class="row">
        <div class="col-md-12">
          <form action="/admin/user/{{$users->id}}" method="POST" >
            @csrf

            @method('PUT')
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="name">User Name</label>
                <input type="text" class="form-control" id="name" name="name" value="{{$users->name}}">
              </div>
              <div class="form-group col-md-4">
                <label for="first_name">First Name</label>
                <input type="text" class="form-control" id="first_name" name="first_name" value="{{$users->first_name}}">
              </div>
              <div class="form-group col-md-4">
                <label for="last_name">Last Name</label>
                <input type="text" class="form-control" id="last_name" name="last_name" value="{{$users->last_name}}">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="gender">Gender</label>
                <input type="text" class="form-control" id="gender" name="gender" value="{{$users->gender}}">
              </div>
               <div class="form-group col-md-4">
                <label for="dob">Date of Birth</label>
                <input type="date" class="form-control" id="dob" name="dob">
              </div>
              <div class="form-group col-md-4">
                <label for="status">Status</label>
                <select class="form-control" id="status" name="status">
                  <option value="active" name="status" id="status">Active</option>
                  <option value="inactive" name="status" id="status">Inactive</option>
                </select>
              </div>
            </div>

           <div class="form-row">
              <div class="form-group col-md-6">
                <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" name="email" value="{{$users->email}}">
              </div>
              <div class="form-group col-md-6">
                <label for="dob">Password</label>
                  <input type="text" class="form-control" id="password" name="password" value="{{$users->password}}">
              </div>
               

            <button type="submit" class="btn btn-success mt-2" style="color: black;">Update users</button>
          </form>

        </div>
      </div>
    </div>



  

</x-admin-layout>





