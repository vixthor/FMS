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
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Feedback({
    complaints,
}: {
    complaints: {
        id: number;
        building: { name: string };
        issue_type: string;
        priority: string;
        status: string;
    }[];
}) {
    const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

    const handleApprove = (complaintId: number) => {
        Inertia.patch(route("user.complaints.approve", complaintId), {}, {
            onSuccess: () => {
                setSelectedComplaint(null); // Close the dialog after success
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Feedback
                </h2>
            }
        >
            <div className="space-y-6">
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">My Complaints</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead>Building</TableHead>
                                <TableHead>Issue Type</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
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
                                        <TableCell>
                                            {complaint.status === "Completed" && (
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            onClick={() =>
                                                                setSelectedComplaint(complaint)
                                                            }
                                                        >
                                                            Approve
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Approve Complaint
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <p>
                                                            Are you sure you want to approve this
                                                            complaint?
                                                        </p>
                                                        <DialogFooter>
                                                            <Button
                                                                onClick={() =>
                                                                    handleApprove(complaint.id)
                                                                }
                                                            >
                                                                Yes, Approve
                                                            </Button>
                                                            <Button
                                                                variant="secondary"
                                                                onClick={() =>
                                                                    setSelectedComplaint(null)
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-gray-500">
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