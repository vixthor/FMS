<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // $this->app->singleton('role', function ($app) {
        //     return new \Spatie\Permission\Middlewares\RoleMiddleware();
        // });

      
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                return $user ? [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'roles' => $user->getRoleNames(), // Spatie's method to get role names
                    ],
                ] : null;
            },
        ]);
        Vite::prefetch(concurrency: 3);


    }
}
