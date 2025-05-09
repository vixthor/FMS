import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import axios from 'axios';

const User: React.FC = () => {
    const { auth, users } = usePage().props; // Fetch users from Inertia props

    const assignRole = async (id: number, role: string) => {
        try {
            await axios.post(route('users.assign-role', id), { role });
            alert(`Role '${role}' assigned successfully`);
            location.reload(); // Reload the page to fetch updated data
        } catch (error) {
            console.error('Error assigning role:', error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Users
                </h2>
            }
        >
            <Head title="Manage Users" />

            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">Hello {auth.user.name} 👋,</h1>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">User Roles</h2>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: { id: number; name: string; email: string; role: string }) => (
                                <tr key={user.id}>
                                    <td className="border p-2">{user.name}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">
                                        <Select
                                            onValueChange={(value) => assignRole(user.id, value)}
                                            value={user.role}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                                <SelectItem value="student">Student</SelectItem>
                                                <SelectItem value="staff">Staff</SelectItem>
                                                <SelectItem value="faculty">Faculty</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="border p-2">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => alert(`User ${user.name} removed`)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default User;



