<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Roster;
use Illuminate\Http\Request;

class RosterController extends Controller
{
    public function index()
    {
        $rosters = Roster::with('user')->get();
        $users = User::role('user')->get();

        return Inertia::render('Admin/RosterPage', [
            'rosters' => $rosters,
            'users' => $users,
        ]);

        
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'month' => 'required|string|max:255',
        ]);

        Roster::create($request->all());

        return redirect()->back()->with('success', 'Roster entry added successfully.');
    }
}
