import React, { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Input } from "@/Components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/Components/ui/select";
import { usePage } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/Components/ui/dialog"
// import { Button } from "@/Components/ui/button"
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ComplaintModal from "@/Components/ui/ComplaintModal";
import { useForm } from "@inertiajs/react";
import DashboardStats from '@/Components/StatsCard';



const Admin: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const complaintsData = [
        { date: "12 sept", ongoing: 300, resolved: 200 },
        { date: "13 sept", ongoing: 500, resolved: 250 },
        { date: "14 sept", ongoing: 750, resolved: 300 },
        { date: "15 sept", ongoing: 400, resolved: 350 },
        { date: "16 sept", ongoing: 600, resolved: 280 },
        { date: "17 sept", ongoing: 500, resolved: 400 },
    ];

    const user = usePage().props.auth.user;

    return (
        <div className="h-screen w-full  p-6 flex flex-col space-y-6">
            <h1 className="text-2xl font-bold">Hello {user.name} 👋,</h1>

            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 flex-grow">
                {/* Complaints Chart */}
                <Card className="w-full md:w-2/3 flex-grow">
                    <CardContent>
                        <h2 className="text-lg font-semibold mb-4">Ongoing vs Resolved Complaints</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={complaintsData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="ongoing" stroke="#3b82f6" strokeWidth={2} />
                                <Line type="monotone" dataKey="resolved" stroke="#8b5cf6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Available Technicians */}
                <Card className="w-full md:w-1/3 flex-grow">
                    <CardContent>
                        <h2 className="text-lg font-semibold">Available Technicians</h2>
                        <ul className="mt-2 space-y-2">
                            {["Chinonso Okafor", "Amara Nwosu", "Obinna Eze", "Ngozi Uche"].map((name) => (
                                <li key={name} className="border-b py-2">{name}</li>
                            ))}
                        </ul>
                        <Button className="mt-2" variant={'blue'} onClick={openModal}>Assign Tasks</Button>
                        <ComplaintModal 
                            isOpen={isModalOpen}
                            onClose={closeModal}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent>
                        <p className="text-lg font-semibold">500</p>
                        <p className="text-gray-500">Submitted</p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-green-500">Completed</span>
                            <span className="font-semibold">180</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-red-500">Pending</span>
                            <span className="font-semibold">380</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p className="text-gray-500">Avg Repair Time</p>
                        <p className="text-2xl font-bold">2hrs</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p className="text-gray-500">Avg Response Time</p>
                        <p className="text-2xl font-bold">1hr</p>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Table */}
            <Card className="flex-grow">
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <Input placeholder="Search" className="w-1/3" />
                        <Select>
                            <SelectTrigger>Sort by: Newest</SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Item Name</th>
                                <th className="border p-2">Category</th>
                                <th className="border p-2">Quantity Available</th>
                                <th className="border p-2">Last Updated</th>
                                <th className="border p-2">Priority</th>
                                <th className="border p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">Light Bulbs</td>
                                <td className="border p-2">Electrical</td>
                                <td className="border p-2">20</td>
                                <td className="border p-2">2025-03-10</td>
                                <td className="border p-2">High</td>
                                <td className="border p-2 text-green-500 font-bold">Done</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Light Bulbs</td>
                                <td className="border p-2">Electrical</td>
                                <td className="border p-2">20</td>
                                <td className="border p-2">2025-03-10</td>
                                <td className="border p-2">High</td>
                                <td className="border p-2 text-green-500 font-bold">Done</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
            <DashboardStats></DashboardStats>
        </div>
    );
};

export default Admin;
