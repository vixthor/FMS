<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::middleware('auth:sanctum')->post('/users/{id}/assign-role', [UserController::class, 'assignRole']);
