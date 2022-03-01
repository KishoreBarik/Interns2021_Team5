<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        //factory(App\User::class, 2)->create()
        \App\Models\User::factory()->count(2)->create()
        ->each(function($user){
            $user->role()->save(\App\Models\Role::factory()->make());

        });
    }
}
