<?php

namespace Database\Seeders;

use App\Models\Complaint;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ComplaintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Complaint::create([
        //     'user_id' => 1, // Replace with an existing user ID
        //     'building_id' => 1, // Replace with an existing building ID
        //     'room_number' => '101',
        //     'issue_type' => 'Electrical',
        //     'details' => 'The lights in the room are not working.',
        //     'priority' => 'High',
        //     'status' => 'Pending',
        // ]);

        // Complaint::create([
        //     'user_id' => 2, // Replace with an existing user ID
        //     'building_id' => 2, // Replace with an existing building ID
        //     'room_number' => '202',
        //     'issue_type' => 'Plumbing',
        //     'details' => 'The sink is leaking.',
        //     'priority' => 'Medium',
        //     'status' => 'In Progress',
        // ]);

        // Complaint::create([
        //     'user_id' => 3, // Replace with an existing user ID
        //     'building_id' => 3, // Replace with an existing building ID
        //     'room_number' => '303',
        //     'issue_type' => 'HVAC',
        //     'details' => 'The air conditioning is not cooling.',
        //     'priority' => 'Low',
        //     'status' => 'Resolved',
        // ]);

        // Additional complaints
        Complaint::create([
            'user_id' => 4,
            'building_id' => 1,
            'room_number' => '104',
            'issue_type' => 'Electrical',
            'details' => 'Power outage in the room.',
            'priority' => 'High',
            'status' => 'Pending',
        ]);

        Complaint::create([
            'user_id' => 5,
            'building_id' => 2,
            'room_number' => '205',
            'issue_type' => 'Plumbing',
            'details' => 'Toilet is clogged.',
            'priority' => 'Medium',
            'status' => 'Pending',
        ]);

        Complaint::create([
            'user_id' => 6,
            'building_id' => 2,
            'room_number' => '306',
            'issue_type' => 'HVAC',
            'details' => 'Heating system is not working.',
            'priority' => 'Low',
            'status' => 'In Progress',
        ]);

        Complaint::create([
            'user_id' => 7,
            'building_id' => 1,
            'room_number' => '407',
            'issue_type' => 'Structural',
            'details' => 'Cracks in the wall.',
            'priority' => 'Medium',
            'status' => 'Pending',
        ]);

        Complaint::create([
            'user_id' => 8,
            'building_id' => 2,
            'room_number' => '508',
            'issue_type' => 'Electrical',
            'details' => 'Broken light switch.',
            'priority' => 'Low',
            'status' => 'Resolved',
        ]);

        Complaint::create([
            'user_id' => 9,
            'building_id' => 3,
            'room_number' => '609',
            'issue_type' => 'Plumbing',
            'details' => 'Water pressure is too low.',
            'priority' => 'Medium',
            'status' => 'Pending',
        ]);

        Complaint::create([
            'user_id' => 10,
            'building_id' => 1,
            'room_number' => '710',
            'issue_type' => 'HVAC',
            'details' => 'Ventilation system is noisy.',
            'priority' => 'Low',
            'status' => 'In Progress',
        ]);
    }
}
