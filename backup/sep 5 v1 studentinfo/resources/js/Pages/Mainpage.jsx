import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

export default function Mainpage() {
    return (
        <GuestLayout>
            <Head title="Main Page" />

            <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Welcome to Smart Monitoring
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Please choose your login method
                        </p>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <PrimaryButton className="w-full">
                                    <Link href={route('login')} className="w-full inline-block text-center">
                                        Login as Admin
                                    </Link>
                                </PrimaryButton>
                            </div>
                            <div>
                                <PrimaryButton className="w-full bg-blue-500 hover:bg-blue-600">
                                    <Link href={route('student.login')} className="w-full inline-block text-center">
                                        Login as Student
                                    </Link>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

