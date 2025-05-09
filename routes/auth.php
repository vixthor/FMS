<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

   

    // // Admin routes
    // Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
    //     Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    //     Route::post('/complaints/{complaint}/assign', [AdminController::class, 'assignTechnician'])->name('complaints.assign');
    //     Route::get('/inventory', [AdminController::class, 'inventoryIndex'])->name('inventory.index');
    // });

    // // Technician routes
    // Route::middleware(['role:technician'])->prefix('technician')->name('technician.')->group(function () {
    //     Route::get('/dashboard', [TechnicianController::class, 'dashboard'])->name('dashboard');
    //     Route::patch('/complaints/{complaint}/status', [TechnicianController::class, 'updateRequestStatus'])->name('complaints.update-status');
    //     Route::post('/inventory', [TechnicianController::class, 'addInventory'])->name('inventory.store');
    // });

    // // User routes
    
    // Route::name('user.')->group(function () {
    //     Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
    //     Route::prefix('complaints')->name('complaints.')->group(function () {
    //         Route::get('/', [UserController::class, 'complaintsIndex'])->name('index');
    //         Route::post('/', [UserController::class, 'storeComplaint'])->name('store');
    //         Route::get('/{complaint}', [UserController::class, 'showComplaint'])->name('show');
    //     });
  //  });

    
});
