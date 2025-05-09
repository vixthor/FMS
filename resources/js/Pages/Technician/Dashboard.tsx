// resources/js/Pages/Technician/Dashboard.tsx
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Inertia } from "@inertiajs/inertia";
import TechnicianLayout from "@/Layouts/TechnicianLayout";

export default function TechnicianDashboard({
    assignedRequests,
    completedRequests,
    building,
    supervisor,
}: {
    assignedRequests: any[];
    completedRequests: any[];
    building: any;
    supervisor: any;
}) {
    const [assigned, setAssigned] = useState(assignedRequests);
    const [completed, setCompleted] = useState(completedRequests);

    const handleStatusChange = (complaintId: number, newStatus: string) => {
        Inertia.patch(route("technician.complaints.updatestatus", complaintId),
            { status: newStatus },
            {
                onSuccess: () => {
                    if (newStatus === "Completed") {
                        const updatedAssigned = assigned.filter(
                            (assignment) => assignment.complaint.id !== complaintId
                        );
                        const completedTask = assigned.find(
                            (assignment) => assignment.complaint.id === complaintId
                        );
                        if (completedTask) {
                            setAssigned(updatedAssigned);
                            setCompleted([...completed, completedTask]);
                        }
                    }
                },
            }
        );
    };

    return (
        <TechnicianLayout>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Assigned Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Request ID</TableHead>
                                        <TableHead>Issue Type</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assigned.map((assignment) => (
                                        <TableRow key={assignment.id}>
                                            <TableCell>{assignment.complaint.id}</TableCell>
                                            <TableCell>{assignment.complaint.issue_type}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        assignment.complaint.priority === "High"
                                                            ? "bg-red-100 text-red-800"
                                                            : assignment.complaint.priority === "Medium"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                                >
                                                    {assignment.complaint.priority}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    defaultValue={assignment.complaint.status}
                                                    onValueChange={(value) =>
                                                        handleStatusChange(assignment.complaint.id, value)
                                                    }
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                                                        <SelectItem value="Completed">Completed</SelectItem>
                                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Request ID</TableHead>
                                        <TableHead>Issue Type</TableHead>
                                        <TableHead>Repair Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {completed.map((assignment) => (
                                        <TableRow key={assignment.id}>
                                            <TableCell>{assignment.complaint.id}</TableCell>
                                            <TableCell>{assignment.complaint.issue_type}</TableCell>
                                            <TableCell>
                                                {Math.floor(assignment.repair_time / 60)}h{" "}
                                                {assignment.repair_time % 60}m
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Assigned Building</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{building?.name || "No building assigned"}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Supervisor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{supervisor?.name || "No supervisor assigned"}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TechnicianLayout>
    );
}