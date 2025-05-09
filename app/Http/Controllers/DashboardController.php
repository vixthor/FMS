<?php

namespace App\Http\Controllers;


use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Complaint;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class DashboardController extends Controller
{
    public function index(): Response
    {   
        // $user = auth()->user();
      //  Check if the user is an admin

        // if (Auth::user()->role !== 'Admin') {
        //     echo "You are not authorized to access this page.";
        // }
        return Inertia::render('Dashboard', [
            'complaintsData' => Complaint::selectRaw('DATE(created_at) as date, COUNT(*) as ongoing, SUM(status = "Resolved") as resolved')
                ->groupBy('date')
                ->get(),
            'technicians' => User::where('role', 'Technician')->select('id', 'name')->get(),
            'inventory' => Inventory::select('id', 'name', 'category', 'quantity', 'updated_at', 'priority', 'status')->get(),
            
        ]);
    }
}
