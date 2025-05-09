<?php

use Inertia\Inertia;
use App\Models\Complaint;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RosterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\TechnicianController;
use App\Models\Technician;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
    ]);
});




Route::middleware(['auth'])->group(function () {
    // Dashboard redirection based on role
    

    // Profile routes (accessible to all authenticated users)
    // Functioning as intended.
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    Route::get('/dashboard', function () {
        if (auth()->user()->hasRole('admin')) {
            return redirect()->route('admin.dashboard');
        } elseif (auth()->user()->hasRole('technician')) {
            return redirect()->route('technician.dashboard');
        }
        return redirect()->route('user.dashboard');
    })->name('dashboard');

    // // Admin routes
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/complaints', [AdminController::class, 'complaintsIndex'])->name('complaints.index');
        Route::post('/complaints/{complaint}/assign', [AdminController::class, 'assignTechnician'])->name('complaints.assign');
        Route::patch('/complaints/{complaint}/priority', [AdminController::class, 'updatePriority'])->name('complaints.updatePriority');
        Route::get('/activity-logs', [AdminController::class, 'viewActivityLogs'])->name('activityLogs');
        // Route::get('/inventory', [AdminController::class, 'inventoryIndex'])->name('inventory.index');
        Route::get('/inventory', [AdminController::class, 'inventoryIndex'])->name('inventory.index');
        Route::post('/inventory', [AdminController::class, 'store'])->name('inventory.store');
        Route::put('/inventory/{inventory}', [AdminController::class, 'update'])->name('inventory.update');
        Route::delete('/inventory/{inventory}', [AdminController::class, 'destroy'])->name('inventory.destroy');
        Route::get('/roster', [RosterController::class, 'index'])->name('roster.index');
        Route::post('/roster', [RosterController::class, 'store'])->name('roster.store');
    });

    // // Technician routes
    Route::middleware(['role:technician'])->prefix('technician')->name('technician.')->group(function () {
        Route::get('/dashboard', [TechnicianController::class, 'dashboard'])->name('dashboard');
        Route::patch('/complaints/{complaint}/status', [TechnicianController::class, 'updateRequestStatus'])->name('complaints.updatestatus');
      
        Route::get('/inventory', [TechnicianController::class, 'inventoryIndex'])->name('inventory.index');
    });
   


    // // User routes
    Route::middleware(['role:user'])->prefix('user')->name('user.')->group(function () {
            Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
        Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
        Route::get('/feedback', [UserController::class, 'feedback'])->name('feedback');
            Route::prefix('complaints')->name('complaints.')->group(function () {
            Route::get('/', [UserController::class, 'complaintsIndex'])->name('index');
            Route::post('/', [UserController::class, 'storeComplaint'])->name('store');
            Route::get('/{complaint}', [UserController::class, 'showComplaint'])->name('show');
            Route::patch('/{complaint}/approve', [UserController::class, 'approveComplaint'])->name('approve');
        });
    });
});

require __DIR__.'/auth.php';