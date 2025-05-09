<?php

// test('example', function () {
//     $response = $this->get('/');

//     $response->assertStatus(200);
// });
public function test_admin_can_create_roles()
{
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $this->actingAs($admin)
         ->post('/admin/roles', ['name' => 'editor'])
         ->assertStatus(201);

    $this->assertDatabaseHas('roles', ['name' => 'editor']);
}
