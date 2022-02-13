<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Project Dashboard') }}
        </h2>
    </x-slot>



    <div class="container mt-2">
      <div class="row">

        @foreach($projects as $project)

        <div class="col-md-12 mt-2">
          <div class="card">
            <h5 class="card-header">{{ $project->project_id }}</h5>
            <div class="card-body">
              <h5 class="card-title">{{$project->project_name}}</h5>
              <p class="card-text">{{$project->description}}


                <form action="/admin/project/{{$project->project_id}}" method="POST">
                  @csrf
                  @method('delete')

                  <button  class="btn btn-danger ml-2" type="submit" style="float: right; color: black; background-color: red;">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    
                  </button>
                  <!-- <a href="#" class="btn btn-danger ml-2" style="float: right;"></a> -->


                </form>
                

                <a href="/admin/project/{{$project->project_id}}/edit" class="btn btn-success " style="float: right;"><i class="fa fa-edit"></i></a>

              </p>
              
            </div>
          </div>
        </div>

        @endforeach
      </div>
    </div>

</x-admin-layout>
