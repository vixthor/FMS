import React from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";

type InventoryItem = {
    id: number;
    item_name: string;
    description: string;
    quantity: number;
};

interface InventoryTableProps {
    inventories: InventoryItem[];
    onDelete: (id: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventories, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventories.map((item) => (
                <Card key={item.id}>
                    <CardContent className="p-4 space-y-2">
                        <h3 className="text-lg font-bold">{item.item_name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="font-medium">Quantity: {item.quantity}</p>
                        <Button
                            variant="destructive"
                            onClick={() => onDelete(item.id)}
                        >
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default InventoryTable;
