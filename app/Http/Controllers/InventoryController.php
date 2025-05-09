<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $inventories = Inventory::all();
        return Inertia::render('InventoryPage', [
            'inventories' => $inventories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'location' => 'required|string|max:255',
            'priority' => 'required|string|in:low,medium,high',
            'status' => 'required|string|in:available,unavailable,pending',
        ]);

        Inventory::create($validated);

        return redirect()->back()->with('success', 'Inventory item added successfully.');
    }

    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return redirect()->back()->with('success', 'Item deleted');
    }
}

