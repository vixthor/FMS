<?php

namespace Database\Seeders;

use App\Models\Building;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BuildingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Building::create([
            'name' => 'Zambezi',
            'description' => 'The main administrative building.',
        ]);

        Building::create([
            'name' => 'Volta',
            'description' => 'Building for engineering departments.',
        ]);

        Building::create([
            'name' => 'Blue Nile',
            'description' => 'Central library for students and staff.',
        ]);

        Building::create([
            'name' => 'Red Nile',
            'description' => 'Building for indoor sports and activities.',
        ]);
    }
}
