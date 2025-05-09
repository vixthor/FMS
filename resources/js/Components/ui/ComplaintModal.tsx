import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectItem, SelectContent } from "@/Components/ui/select";
import { useForm } from "@inertiajs/react";

interface ComplaintModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose }) => {

    console.log("Modal isOpen:", isOpen); 
    const { data, setData, post, processing, errors } = useForm({
        issue_type: "Plumbing",
        building_name: "",
        room_number: "",
        complaint_details: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("complaints.store"), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-10  rounded-xl">
                <DialogHeader>
                    <DialogTitle>Request Details</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-gray-600 text-sm">Issue Type</label>
                        <Input value={data.issue_type} disabled className="bg-gray-100" />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Building Name</label>
                        <Select onValueChange={(value) => setData("building_name", value)}>
                           <SelectContent>
                                <SelectItem value="Zambezi">Zambezi</SelectItem>
                                <SelectItem value="Nile">Nile</SelectItem>
                           </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Room Number</label>
                        <Input
                            type="text"
                            value={data.room_number}
                            onChange={(e) => setData("room_number", e.target.value)}
                        />
                        {errors.room_number && <p className="text-red-500 text-sm">{errors.room_number}</p>}
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Complaint Details</label>
                        <Textarea
                            value={data.complaint_details}
                            onChange={(e) => setData("complaint_details", e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <Button type="button" variant="secondary" onClick={onClose} className="bg-gray-300">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-blue-800 text-white">
                            Confirm
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ComplaintModal;
