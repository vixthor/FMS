import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

interface Complaint {
    id: number;
    building: { name: string };
    issue_type: string;
    assignedTechnician: { user: { name: string } } | null;
    priority: string;
    status: string;
}

interface ComplaintsProps {
    complaints: Complaint[];
    technicians: { id: number; user: { name: string } }[];
}

export default function ComplaintsPage({ complaints, technicians }: ComplaintsProps) {
    const { data, setData, patch , post, processing } = useForm({
        technician_id: "",
    });

    const handleAssign = (complaintId: number) => {
        post(route("admin.complaints.assign", complaintId), {
            onSuccess: () => {
                alert("Technician assigned successfully!");
            },
        });
    };
    const handlePriorityChange = (complaintId: number, newPriority: string) => {
        patch(route("admin.complaints.updatePriority", complaintId), {
            priority: newPriority,
        });
    };

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">All Complaints</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead>Building</TableHead>
                                <TableHead>Issue Type</TableHead>
                                <TableHead>Assigned Technician</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assign</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {complaints.map((complaint) => (
                                <TableRow key={complaint.id}>
                                    <TableCell>{complaint.id}</TableCell>
                                    <TableCell>{complaint.building.name}</TableCell>
                                    <TableCell>{complaint.issue_type}</TableCell>
                                    <TableCell>
                                        {complaint.assignedTechnician
                                            ? complaint.assignedTechnician.user.name
                                            : "Unassigned"}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={complaint.priority}
                                            onValueChange={(value) =>
                                                handlePriorityChange(complaint.id, value)
                                            }
                                        >
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="High">High</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="Low">Low</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>{complaint.status}</TableCell>
                                    <TableCell>
                                        {!complaint.assignedTechnician && (
                                            <div className="flex items-center space-x-2">
                                                <Select
                                                    onValueChange={(value) => setData("technician_id", value)}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select technician" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {technicians.map((tech) => (
                                                            <SelectItem key={tech.id} value={tech.id.toString()}>
                                                                {tech.user.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    onClick={() => handleAssign(complaint.id)}
                                                    disabled={processing || !data.technician_id}
                                                >
                                                    Assign
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AdminLayout>
    );
}
