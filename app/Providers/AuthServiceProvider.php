<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Complaint;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Gate::define('update-complaint', function (User $user, Complaint $complaint) {
        //     return $user->hasRole('maintenance');
        // });
    }
}
