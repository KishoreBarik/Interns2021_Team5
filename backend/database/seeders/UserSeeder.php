<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\{
    User,
    ProjectAccess,
    Project,
    Tools,
};

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //  

        User::create([

            'name' =>'akhil',
            'first_name'=>'akhil',
            'last_name'=>'duggirala',
            'gender'=>'male',
            'dob'=>'5Nov',
            'status'=>'active',
            'email'=>'akhil@sailspot.com',
            'password'=>bcrypt('password')

        ]);


    }
}
