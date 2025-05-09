import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AdminLayout from "@/Layouts/AdminLayout";

export default function ActivityLogs({ logs }: { logs: any[] }) {
    if (!Array.isArray(logs) || logs.length === 0) {
        return (
            <AdminLayout>
                <div className="p-6 space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Activity Logs</h3>
                    <p className="text-gray-500 text-center">No activity logs available.</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-4">Activity Logs</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Log ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.log_id}>
                                <TableCell>{log.log_id}</TableCell>
                                <TableCell>{log.user?.name || "System"}</TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.details}</TableCell>
                                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}