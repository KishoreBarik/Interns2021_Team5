<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Admin;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $admin = [
            'name'=>'admin',
            'email'=>'admin@sailspot.com',
            'password'=>bcrypt('password')
        ];

        $user = [

            'name'=>'user',
            'email'=>'user@sailspot.com',
            'password'=>bcrypt('password'),
            'first_name'=>'userFirst',
            'last_name'=>'userLast',
            'gender'=>'Male',
            'dob'=>'05Nov',
            'status'=>'active'

        ];

        

        Admin::create($admin);
        User::create($user);
    }
}
