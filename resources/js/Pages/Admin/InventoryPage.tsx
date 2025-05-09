import { usePage, useForm } from "@inertiajs/react"; 
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout"; import { useState } from "react";

export default function InventoryPage() {
    const { inventory } = usePage().props;
    const [editingItem, setEditingItem] = useState(null);

    const { data, setData, post, put, delete: destroy, reset, errors } = useForm({
        id: "",
        name: "",
        category: "",
        quantity: "",
        priority: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(route("admin.inventory.update", editingItem.id), {
                onSuccess: () => {
                    reset();
                    setEditingItem(null);
                },
            });
        } else {
            post(route("admin.inventory.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setData({
            id: item.id,
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            priority: item.priority,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            destroy(route("admin.inventory.destroy", id));
        }
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inventory Management
                </h2>
            }
        >
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{editingItem ? "Edit Inventory Item" : "Add Inventory Item"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Category</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData("category", e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Civil">Civil</option>
                                    <option value="A/C">A/C</option>
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Carpentry">Carpentry</option>
                                    <option value="Welding">Welding</option>
                                    <option value="I.T.">I.T.</option>
                                    <option value="Environmental">Environmental</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={data.quantity}
                                    onChange={(e) => setData("quantity", e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                            </div>
                            {/* <div>
                                <label className="block text-sm font-medium">Priority</label>
                                <select
                                    name="priority"
                                    value={data.priority}
                                    onChange={(e) => setData("priority", e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Priority
                                    </option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
                            </div> */}
                            <Button type="submit">{editingItem ? "Update Item" : "Add Item"}</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Inventory List</CardTitle>
                    </CardHeader>
                    <CardContent>

                        {inventory.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No inventory items found.</p>
                                <p className="text-gray-500">Add a new inventory item to get started.</p>
                            </div>
                        ) : (
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">#</th>
                                        <th className="border border-gray-300 px-4 py-2">Item Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Category</th>
                                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Priority</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventory.map((item: any, index: number) => (
                                        <tr key={item.id}>
                                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                            {/* <td className="border border-gray-300 px-4 py-2">{item.priority}</td> */}
                                            <td className="border border-gray-300 px-4 py-2">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="ml-2"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
