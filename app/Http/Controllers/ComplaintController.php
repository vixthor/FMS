<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {





        return Inertia::render('Complaints', [
            'complaints' => Complaint::with('assignedTechnician:id,name')->get(),
            'totalComplaints' => Complaint::count(),
            'totalResolved' => Complaint::where('status', 'Resolved')->count(),
            'totalPending' => Complaint::where('status', 'Pending')->count(),
            'totalAssets' => 200, // Example static value, update if needed
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'issue_type' => 'required|string',
            'building_name' => 'required|string',
            'room_number' => 'required|string',
            'complaint_details' => 'required|string',
            'priority' => 'required|string|max:255',
        ]);

        Complaint::create([
            'user_id' => Auth::id(),
            'issue_type' => $request->issue_type,
            'building_name' => $request->building_name,
            'room_number' => $request->room_number,
            'complaint_details' => $request->complaint_details,
            'status' => 'pending',
        ]);

        return redirect()->route('dashboard')->with('success', 'Complaint submitted successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Complaint $complaint)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Complaint $complaint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Complaint $complaint)
    {
        if (!Gate::allows('update-complaint', $complaint)) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:pending,in_progress,resolved',
        ]);

        $complaint->update([
            'status' => $request->status,
            'assigned_to' => Auth::id(),
        ]);

        return redirect()->route('complaints.index')->with('success', 'Complaint updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Complaint $complaint)
    {
        //
    }
}
