<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'view dashboard',
            'manage complaints',
            'assign technicians',
            'manage inventory',
            'update request status',
            'submit complaints',
            'view own complaints',
            'manage buildings',
            'view rosters'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo([
            'view dashboard',
            'manage complaints',
            'assign technicians',
            'manage inventory',
            'manage buildings',
            'view rosters'
        ]);

        $technician = Role::create(['name' => 'technician']);
        $technician->givePermissionTo([
            'view dashboard',
            'update request status',
            'manage inventory'
        ]);

        $user = Role::create(['name' => 'user']);
        $user->givePermissionTo([
            'view dashboard',
            'submit complaints',
            'view own complaints'
        ]);
    }
}
