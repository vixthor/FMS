import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div
                className="relative flex min-h-screen bg-blue-600 items-center justify-center bg-cover bg-center text-white"
                style={{
                    // backgroundColor: `url('/images/nile-university-logo.jpg')`, // Updated background image path
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold">Welcome to Nile University Facility Management System</h1>
                    <p className="mt-4 text-lg">Version 1.0</p>
                    <div className="mt-8 flex justify-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-800"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
