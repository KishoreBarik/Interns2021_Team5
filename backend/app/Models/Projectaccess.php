<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projectaccess extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','access_id','project_id','status'];

    public function user(){
        return $this->belongsToMany(User::class);
    }

     public function project(){
        return $this->belongsToMany(Project::class);
    }

}
