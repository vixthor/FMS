<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Building;
use App\Models\Complaint;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function dashboard()
    {
        
        $user = auth()->user();
        $buildings = Building::all();
        $submittedComplaints = $user->complaints()->count();
        $resolvedComplaints = $user->complaints()->where('status', 'Approved')->count();
        $pendingComplaints = $user->complaints()->where('status', '!=', 'Approved')->count();
        $complaints = $user->complaints()->with('building')->latest()->get();

        return Inertia::render('User/Dashboard', [
            'buildings' => $buildings,
            'stats' => [
                'submittedComplaints' => $submittedComplaints,
                'resolvedComplaints' => $resolvedComplaints,
                'pendingComplaints' => $pendingComplaints,
            ],
            'complaints' => $complaints,
        ]);
    }

    public function complaintsIndex()
    {
        $complaints = auth()->user()->complaints()
            ->with(['building', 'assignment.technician.user'])
            ->latest()
            ->get();

        $buildings = Building::all();

        return Inertia::render('User/Complaints/Index', [
            'complaints' => $complaints,
            'buildings' => $buildings,
        ]);
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
        $data['priority'] = 'Medium'; // Default priority set by the system
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

    public function showComplaint(Complaint $complaint)
    {
        $complaint->load(['building', 'assignment.technician.user']);
        return Inertia::render('User/Complaints/Show', [
            'complaint' => $complaint,
        ]);
    }

    public function approveComplaint(Complaint $complaint)
    {
        if ($complaint->status !== 'Completed') {
            return redirect()->back()->with('error', 'Complaint must be marked as Done before approval');
        }

        $complaint->update([
            'status' => 'Approved',
            'user_approved' => true,
        ]);

        return redirect()->back()->with('success', 'Complaint approved successfully');
    }
    public function feedback()
    {
        $complaints = auth()->user()->complaints()
            ->with('building') // Load related building information
            ->latest()
            ->get();

        return Inertia::render('User/Feedback', [
            'complaints' => $complaints,
        ]);
    }
    // public function index()
    // {
    //     // Fetch all users with their roles
    //     $users = User::select('id', 'name', 'email', 'role')->get();

    //     // Pass users to the Inertia view
    //     return Inertia::render('Roles/User', [
    //         'users' => $users,
    //     ]);
    // }
    // public function assignRole(Request $request, $id)
    // {
    //     $user = User::findOrFail($id);
    //     $role = $request->input('role');

    //     if (!Role::where('name', $role)->exists()) {
    //         return response()->json(['message' => 'Role does not exist'], 404);
    //     }

    //     $user->syncRoles([$role]);

    //     return response()->json(['message' => "Role '{$role}' assigned to user successfully"]);
    // }

    // public function removeRole(Request $request, $id)
    // {
    //     $user = User::findOrFail($id);
    //     $role = $request->input('role');

    //     if (!Role::where('name', $role)->exists()) {
    //         return response()->json(['message' => 'Role does not exist'], 404);
    //     }

    //     $user->removeRole($role);

    //     return response()->json(['message' => "Role '{$role}' removed from user successfully"]);
    // }
}
