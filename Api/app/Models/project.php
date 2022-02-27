<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class project extends Model
{
    use HasFactory;

    protected $table = 'project';

    protected $primaryKey = 'project_id';

    protected $fillable = [
        'project_id', 'project_name', 'description','user_id', 'tool_id', 'added_by', 'status'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }


    public function tool(){
        return $this->belongsToMany(Tool::class);
    }

    public function projectaccess(){
        return $this->hasMany(Projectaccess::class);
    }


}
