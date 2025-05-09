<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Complaint;
use App\Models\Inventory;
use App\Models\Technician;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $inventory = Inventory::latest()->get();
        $totalComplaints = Complaint::count();
        $resolvedComplaints = Complaint::where('status', 'Completed')->count();
        $pendingComplaints = Complaint::where('status', '!=', 'Completed')->count();
        $totalInventory = Inventory::count();

        $ongoingVsResolved = [
            'labels' => ['12 Sept', '13 Sept', '14 Sept', '15 Sept', '16 Sept', '17 Sept'],
            'ongoing' => [120, 190, 130, 180, 150, 200],
            'resolved' => [80, 110, 90, 120, 100, 150],
        ];

        $availableTechnicians = Technician::with('user')->where('is_available', true)->get();
        $unassignedRequests = Complaint::whereDoesntHave('assignment')->where('status', '!=', 'Completed')->latest()
            ->take(5)
            ->get();
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalComplaints' => $totalComplaints,
                'resolvedComplaints' => $resolvedComplaints,
                'pendingComplaints' => $pendingComplaints,
                'totalInventory' => $totalInventory,
            ],
            'ongoingVsResolved' => $ongoingVsResolved,
            'technicians' =>  $availableTechnicians,
            'unassignedRequests' => $unassignedRequests,
            'inventory' => $inventory,
        ]);
    }

    public function assignTechnician(Request $request, Complaint $complaint)
    {
        $request->validate([
            'technician_id' => 'required|exists:technicians,id',
        ]);

        $complaint->update([
            'status' => 'Assigned',
        ]);

        $complaint->assignment()->create([
            'technician_id' => $request->technician_id,
            'assigned_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Technician assigned successfully');
    }

    public function inventoryIndex()
    {
        $inventory = Inventory::latest()->get();
        return Inertia::render('Admin/InventoryPage', [
            'inventory' => $inventory,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
        ]);

        Inventory::create($request->all());

        return redirect()->back()->with('success', 'Inventory item added successfully.');
    }
    public function update(Request $request, Inventory $inventory)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'priority' => 'required|string|max:255',
        ]);

        $inventory->update($request->all());

        return redirect()->back()->with('success', 'Inventory item updated successfully.');
    }

    public function destroy(Inventory $inventory)
    {
        $inventory->delete();

        return redirect()->back()->with('success', 'Inventory item deleted successfully.');
    }
    /**
     * Display a listing of the resource.
     */
public function complaintsIndex()
{
    $complaints = Complaint::with(['building', 'assignment.technician.user'])
        ->latest()
        ->get();

    $technicians = Technician::with('user')->where('is_available', true)->get();

    return Inertia::render('Admin/Complaints', [
        'complaints' => $complaints,
        'technicians' => $technicians,
    ]);
}

    public function updatePriority(Request $request, Complaint $complaint)
    {
        $request->validate([
            'priority' => 'required|string|in:High,Medium,Low',
        ]);

        $complaint->update([
            'priority' => $request->priority,
        ]);

        // Log the action
        ActivityLog::logAction(
            auth()->id(),
            'Updated Complaint Priority',
            "Changed priority of complaint ID {$complaint->id} to {$request->priority}"
        );

        return redirect()->back()->with('success', 'Complaint priority updated successfully.');
    }

    public function storeComplaint(Request $request)
    {
        $request->validate([
            'building_id' => 'required|exists:buildings,id',
            'room_number' => 'required|string|max:255',
            'issue_type' => 'required|string|max:255',
            'details' => 'required|string',
        ]);

        $data = $request->all();
        $data['status'] = 'Unassigned';
        $data['priority'] = 'Medium';
        $data['user_id'] = auth()->id();

        $complaint = Complaint::create($data);

        // Log the action
        ActivityLog::logAction(
            auth()->id(),
            'Created Complaint',
            "Created complaint ID {$complaint->id} with issue type {$request->issue_type}"
        );

        return redirect()->back()->with('success', 'Complaint submitted successfully');
    }

    public function viewActivityLogs()
    {
        $logs = ActivityLog::with('user')->latest()->get(); // Ensure this returns an array

        return Inertia::render('Admin/ActivityLogs', [
            'logs' => $logs,
        ]);
    }
}
