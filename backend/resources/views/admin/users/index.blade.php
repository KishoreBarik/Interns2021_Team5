<x-admin-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Users Dashboard') }}
        </h2>
    </x-slot>



    <div class="container mt-4">
      <div class="row">
        <table class="table">
          <thead class="thead-dark">
            <tr>
               <th scope="col">User Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Mail Id</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
          </thead>
          @foreach($users as $user)
            <tbody>
              <tr>
                <th scope="row">{{$user->id}}</th>
                <td>{{$user->first_name}}</td>
                <td>{{$user->last_name}}</td>
                <td>{{$user->email}}</td>
                <td><a href="/admin/user/{{$user->id}}/edit" class="btn btn-success " style="float: right;"><i class="fa fa-edit"></i></a></td>
                <td> <form action="/admin/user/{{$user->id}}" method="POST">
                  @csrf
                  @method('delete')

                  <button  class="btn btn-danger ml-2" type="submit" style="float: right; color: black; background-color: red;">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    
                  </button>
                   


                </form></td>
              </tr>
            </tbody>

          @endforeach


        </table>

        

        <!-- <div class="col-md-12 mt-2">
          <div class="card">
            <h5 class="card-header">{{ $user->id }} <span style="float: right;">User Id:: {{$user->id}}</span></h5>
            <div class="card-body">
              
              <p class="card-text">{{$user->first_name}}


                <form action="/admin/user/{{$user->user_id}}" method="POST">
                  @csrf
                  @method('delete')

                  <button  class="btn btn-danger ml-2" type="submit" style="float: right; color: black; background-color: red;">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    
                  </button>
                   <a href="#" class="btn btn-danger ml-2" style="float: right;"></a> 


                </form>
                

                <a href="/admin/user/{{$user->user_id}}/edit" class="btn btn-success " style="float: right;"><i class="fa fa-edit"></i></a>

              </p>
              
            </div>
          </div>
        </div> -->

       
      </div>
    </div>

</x-admin-layout>
