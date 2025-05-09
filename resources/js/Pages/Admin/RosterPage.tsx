// filepath: c:\xampp\htdocs\FMS\resources\js\Pages\Admin\RosterPage.tsx
import { useForm } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import AdminLayout from "@/Layouts/AdminLayout";
interface Roster {
    id: number;
    user: { name: string };
    month: string;
}

interface RosterPageProps {
    rosters: Roster[];
    users: { id: number; name: string }[];
}

export default function RosterPage({ rosters, users }: RosterPageProps) {
    const { data, setData, post, processing } = useForm({
        user_id: "",
        month: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.roster.store"), {
            onSuccess: () => {
                alert("Roster entry added successfully!");
            },
        });
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Roster</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center space-x-4">
                            {/* User Selection */}
                            <Select
                                onValueChange={(value) => setData("user_id", value)}
                                className="w-1/2"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select User" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user.id} value={user.id.toString()}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Month Selection */}
                            <Select
                                onValueChange={(value) => setData("month", value)}
                                className="w-1/2"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month) => (
                                        <SelectItem key={month} value={month}>
                                            {month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button type="submit" disabled={processing}>
                                Add
                            </Button>
                        </div>
                    </form>
                </Card>

                <Card className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Supervisor</TableHead>
                                <TableHead>Month</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rosters.map((roster) => (
                                <TableRow key={roster.id}>
                                    <TableCell>{roster.user.name}</TableCell>
                                    <TableCell>{roster.month}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AdminLayout>
    );
}