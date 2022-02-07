<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tools extends Model
{
    use HasFactory;

     protected $table = 'tools';

    protected $primaryKey = 'tool_id';


    protected $fillable = ['tool_id','tool_name','description','project_id','url','status'];


    public function project(){
        return $this->belongsToMany(Project::class);
    }
}
