<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Complaint;
use App\Models\Inventory;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    public function dashboard()
    {
        $technician = auth()->user()->technician;

        $assignedRequests = $technician->assignments()
            ->with('complaint.building')
            ->whereHas('complaint', function ($query) {
                $query->where('status', '!=', 'Completed');
            })
            ->get();

        $supervisor = $technician->supervisor; // Assuming a relationship exists
        $building = $technician->building; // Assuming a relationship exists

        return Inertia::render('Technician/Dashboard', [
            'assignedRequests' => $assignedRequests,
            'completedRequests' => $technician->assignments()
                ->with('complaint')
                ->whereHas('complaint', function ($query) {
                    $query->where('status', 'Completed');
                })
                ->get(),
            'supervisor' => $supervisor,
            'building' => $building,
        ]);
    }

    public function updateRequestStatus(Request $request, Complaint $complaint)
    {
        $request->validate([
            'status' => 'required|in:Ongoing,Completed,Cancelled',
        ]);

        $complaint->update([
            'status' => $request->status,
        ]);

        if ($request->status === 'Completed') {
            $complaint->assignment()->update([
                'completed_at' => now(),
                'repair_time' => optional($complaint->assignment)->assigned_at ? optional($complaint->assignment->assigned_at)->diffInMinutes(now()) : null,
            ]);
        }

        return redirect()->back()->with('success', 'Status updated successfully');
    }

    public function addInventory(Request $request)
    {
        $request->validate([
            'item_name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'priority' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        Inventory::create($request->all());

        return redirect()->back()->with('success', 'Inventory item added successfully');
    }
    public function inventoryIndex()
    {
        $inventory = Inventory::latest()->get();
        return Inertia::render('Technician/InventoryPage', [
            'inventory' => $inventory,
        ]);
    }
}