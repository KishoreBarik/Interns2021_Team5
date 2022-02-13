<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Tool Dashboard') }}
        </h2>
    </x-slot>



    <div class="container mt-2">
      <div class="row">

        @foreach($tools as $tool)

        <div class="col-md-12 mt-2">
          <div class="card">
            <h5 class="card-header">{{ $tool->tool_id }} <span style="float: right;">Project Id:: {{$tool->project_id}}</span></h5>
            <div class="card-body">
              <h5 class="card-title">{{$tool->tool_name}} <span style="float: right;"> <button class="btn btn-success"><a href="{{$tool->url}}" target="blank">URL</a></button></span></h5>
              <p class="card-text">{{$tool->description}}


                <form action="/admin/tool/{{$tool->tool_id}}" method="POST">
                  @csrf
                  @method('delete')

                  <button  class="btn btn-danger ml-2" type="submit" style="float: right; color: black; background-color: red;">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    
                  </button>
                  <!-- <a href="#" class="btn btn-danger ml-2" style="float: right;"></a> -->


                </form>
                

                <a href="/admin/tool/{{$tool->tool_id}}/edit" class="btn btn-success " style="float: right;"><i class="fa fa-edit"></i></a>

              </p>
              
            </div>
          </div>
        </div>

        @endforeach
      </div>
    </div>

</x-admin-layout>
