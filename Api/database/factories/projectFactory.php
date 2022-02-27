<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\project>
 */
class projectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            'project_id' =>'1',
            'project_name' => 'tool_pot',
            'description' => 'tool pot',
            'user_id'=>'1',
            'tool_id'=> '1',
            'added_by' =>'admin',
            'status' => 'active',
        ];
    }
}
