import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Users, CheckCircle, Monitor } from "lucide-react";

interface StatCardProps {
    stats: {
        icon: JSX.Element;
        label: string;
        value: number;
    }[];
}

const StatCard: React.FC<StatCardProps> = ({ stats }) => {
    return (
        <Card className="rounded-2xl shadow-md bg-white p-6 flex justify-between items-center">
            {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">{stat.icon}</div>
                    <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-xl font-semibold">{stat.value}</p>
                    </div>
                </div>
            ))}
        </Card>
    );
};

// Example Usage
const DashboardStats = () => {
    const statsData = [
        { icon: <Users className="text-blue-500" />, label: "Submitted Complaints", value: 50 },
        { icon: <CheckCircle className="text-blue-500" />, label: "Total Resolved", value: 38 },
        { icon: <Monitor className="text-blue-500" />, label: "Total Pending", value: 12 },
    ];

    return <StatCard stats={statsData} />;
};

export default DashboardStats;
const DashboardStats2 = () => {  
    const statsData = [
        { icon: <Users className="text-blue-500" />, label: "Submitted Complaints", value: 50 },
        { icon: <CheckCircle className="text-blue-500" />, label: "Total Resolved", value: 38 },
        { icon: <Monitor className="text-blue-500" />, label: "Total Pending", value: 12 },
    ];

    return <StatCard stats={statsData} />;
}
