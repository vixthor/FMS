// resources/js/Pages/Admin/Dashboard.tsx

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AdminDashboard({
    stats,
    unassignedRequests,
    technicians,
    inventory,
}: {
    stats: {
        totalComplaints: number;
        resolvedComplaints: number;
        pendingComplaints: number;
        totalInventory: number;
    };
    unassignedRequests: any[];
    technicians: any[];
    inventory: any[];
}) {
    const { data, setData, post, processing } = useForm({
        technician_id: "",
        inventory_items: [],
    });

    const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

    const handleAssign = () => {
        post(route("admin.complaints.assign", selectedComplaint.id), {
            onSuccess: () => {
                alert("Complaint assigned successfully!");
                setSelectedComplaint(null);
            },
        });
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Complaints</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.totalComplaints}</p>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Inventory</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.totalInventory}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Complaints</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {unassignedRequests.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No unassigned requests found.</p>
                                <p className="text-gray-500">All requests have been assigned to technicians.</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Request ID</TableHead>
                                        <TableHead>Issue Type</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Assign</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {unassignedRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.id}</TableCell>
                                            <TableCell>{request.issue_type}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        request.priority === "High"
                                                            ? "bg-red-100 text-red-800"
                                                            : request.priority === "Medium"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                                >
                                                    {request.priority}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button onClick={() => setSelectedComplaint(request)}>
                                                            Assign
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Assign Complaint</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-sm font-medium">
                                                                    Select Technician
                                                                </label>
                                                                <Select
                                                                    onValueChange={(value) =>
                                                                        setData("technician_id", value)
                                                                    }
                                                                >
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Select technician" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {technicians.map((tech) => (
                                                                            <SelectItem
                                                                                key={tech.id}
                                                                                value={tech.id.toString()}
                                                                            >
                                                                                {tech.user.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium">
                                                                    Assign Inventory Items
                                                                </label>
                                                                <Select
                                                                    multiple
                                                                    onValueChange={(value) =>
                                                                        setData("inventory_items", value)
                                                                    }
                                                                >
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Select inventory items" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {inventory.map((item) => (
                                                                            <SelectItem
                                                                                key={item.id}
                                                                                value={item.id.toString()}
                                                                            >
                                                                                {item.name} (Qty: {item.quantity})
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                onClick={handleAssign}
                                                                disabled={
                                                                    processing || !data.technician_id || !data.inventory_items.length
                                                                }
                                                            >
                                                                Assign
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}