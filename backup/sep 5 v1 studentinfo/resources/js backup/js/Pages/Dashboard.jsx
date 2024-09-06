import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/5 bg-gray-800 text-white h-screen p-4">
                    <ul className="space-y-4">
                        <li>
                            <Link href={route('dashboard')} className="block px-4 py-2 rounded hover:bg-gray-700">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href={route('users')} className="block px-4 py-2 rounded hover:bg-gray-700">
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link href={route('addstudents')} className="block px-4 py-2 rounded hover:bg-gray-700">
                                Add Students
                            </Link>
                        </li>
                        <li>
                            <Link href={route('students')} className="block px-4 py-2 rounded hover:bg-gray-700">
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link href={route('settings')} className="block px-4 py-2 rounded hover:bg-gray-700">
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link href={route('logout')} method="post" as="button" className="block px-4 py-2 rounded hover:bg-gray-700">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-4/5 py-12 px-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">You're logged in!</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
