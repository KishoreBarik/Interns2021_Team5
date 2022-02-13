<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Admin Dashboard') }}
        </h2>
    </x-slot>


    <div class="container mt-6">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <h3 class="card-title">Project</h3>
                        <p class="card-text"></p>
                        <a href="project/create" class="btn btn-primary">Add Projects</a>
                        <a href="project" class="btn btn-success">Manage Projects</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Tools</h5>
                        <p class="card-text"></p>
                        <a href="tool/create" class="btn btn-primary">Add Tools</a>
                        <a href="tool" class="btn btn-success">Manage Tools</a>
                      </div>
                    </div>
                  </div>
                </div>
                
            </div>
        </div>
    </div>

    <div class="container mt-6">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Users</h5>
                        <p class="card-text"></p>
                        <a href="user/create" class="btn btn-primary">Add Users</a>
                        <a href="user" class="btn btn-success">Manage Users</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Project Access</h5>
                        <p class="card-text"></p>
                        <a href="projectaccess/create" class="btn btn-primary">Grant Access</a>
                        <a href="projectaccess" class="btn btn-success">Manage Access</a>
                      </div>
                    </div>
                  </div>
                </div>
                
            </div>
        </div>
    </div>

   


</x-admin-layout>
