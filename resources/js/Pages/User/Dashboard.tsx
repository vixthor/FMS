// resources/js/Pages/User/Dashboard.tsx
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function UserDashboard({
    stats,
    buildings,
    complaints,
}: {
    stats: {
        submittedComplaints: number;
        resolvedComplaints: number;
        pendingComplaints: number;
    };
    buildings: { id: number; name: string }[];
    complaints: {
        id: number;
        building: { name: string };
        issue_type: string;
        priority: string;
        status: string;
    }[];
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        building_id: "",
        room_number: "",
        issue_type: "",
        details: "",
    
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("user.complaints.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Hello  👋,</h1>
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Submitted Complaints</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.submittedComplaints}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Resolved</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.resolvedComplaints}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Pending</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.pendingComplaints}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">My Complaints</h3>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Add Complaint</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Complaint</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium">Building</label>
                                        <select
                                            value={data.building_id}
                                            onChange={(e) => setData("building_id", e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a building
                                            </option>
                                            {buildings.map((building) => (
                                                <option key={building.id} value={building.id}>
                                                    {building.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.building_id && (
                                            <p className="text-red-500 text-sm">{errors.building_id}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Room Number</label>
                                        <input
                                            type="text"
                                            value={data.room_number}
                                            onChange={(e) => setData("room_number", e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        {errors.room_number && (
                                            <p className="text-red-500 text-sm">{errors.room_number}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Issue Type</label>
                                        <select
                                            value={data.issue_type}
                                            onChange={(e) => setData("issue_type", e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        >
                                            <option value="" disabled>Select an issue type</option>
                                            <option value="Electrical">Electrical</option>
                                            <option value="Plumbing">Plumbing</option>
                                            <option value="HVAC">HVAC</option>
                                            <option value="Structural">Structural</option>
                                            <option value="Carpentry">Carpentry</option>
                                            <option value="Welding">Welding</option>
                                            <option value="I.T.">I.T.</option>
                                            <option value="Environmental">Environmental</option>
                                        </select>
                                        {errors.issue_type && (
                                            <p className="text-red-500 text-sm">{errors.issue_type}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Details</label>
                                        <textarea
                                            value={data.details}
                                            onChange={(e) => setData("details", e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        {errors.details && (
                                            <p className="text-red-500 text-sm">{errors.details}</p>
                                        )}
                                    </div>
                                    {/* <div>
                                        <label className="block text-sm font-medium">Priority</label>
                                        <select
                                            value={data.priority}
                                            onChange={(e) => setData("priority", e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        >
                                            <option value="" disabled>
                                                Select priority
                                            </option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                        {errors.priority && (
                                            <p className="text-red-500 text-sm">{errors.priority}</p>
                                        )}
                                    </div> */}
                                    <DialogFooter>
                                        <Button type="submit" disabled={processing}>
                                            Submit
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead>Building</TableHead>
                                <TableHead>Issue Type</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {complaints.length > 0 ? (
                                complaints.map((complaint) => (
                                    <TableRow key={complaint.id}>
                                        <TableCell>{complaint.id}</TableCell>
                                        <TableCell>{complaint.building.name}</TableCell>
                                        <TableCell>{complaint.issue_type}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    complaint.priority === "High"
                                                        ? "bg-red-100 text-red-800"
                                                        : complaint.priority === "Medium"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {complaint.priority}
                                            </span>
                                        </TableCell>
                                        <TableCell>{complaint.status}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500">
                                        No complaints found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}