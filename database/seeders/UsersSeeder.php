<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Technician;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Precious Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        // Create technician users
        $technicians = [
            // ['Emeka Uche', 'emeka@example.com', 'Electrical'],
            ['Chinonso Ibe', 'chinonso@example.com', 'Plumbing'],
            ['Nkechi Nwosu', 'nkechi@example.com', 'Structural'],
            ['Obinna Eze', 'obinna@example.com', 'HVAC'],
            ['Chika Nwankwo', 'chika@example.com', 'General']
        ];

        foreach ($technicians as $tech) {
            $user = User::create([
                'name' => $tech[0],
                'email' => $tech[1],
                'password' => bcrypt('password'),
            ]);
            $user->assignRole('technician');

            Technician::create([
                'user_id' => $user->id,
                'is_available' => rand(0, 1)
            ]);
        }

        // Create regular users
        for ($i = 1; $i <= 10; $i++) {
            $user = User::create([
                'name' => 'User ' . $i,
                'email' => 'user' . $i . '@example.com',
                'password' => bcrypt('password'),
            ]);
            $user->assignRole('user');
        }
    }
}
