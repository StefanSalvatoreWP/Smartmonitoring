import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Adjust path if needed

const SettingCard = ({ title, items }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index}>
                    <Link 
                        href={item.href} 
                        className="text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out"
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const Settings = ({ auth }) => {
    const settingsCategories = [
        {
            title: "Account Settings",
            items: [
                { label: "Profile", href: "/profile" },
                { label: "Email Preferences", href: "/email" },
                { label: "Notification Settings", href: "/notifications" },
            ]
        },
        {
            title: "Privacy Settings",
            items: [
                { label: "Security", href: "/security" },
                { label: "Data Privacy", href: "/data" },
                { label: "Permissions", href: "/permissions" },
            ]
        },
        {
            title: "General Settings",
            items: [
                { label: "Language", href: "/language" },
                { label: "Timezone", href: "/timezone" },
                { label: "Theme", href: "/theme" },
            ]
        },
        {
            title: "Notifications",
            items: [
                { label: "Email Notifications", href: "/email-notifications" },
                { label: "SMS Notifications", href: "/sms-notifications" },
                { label: "Push Notifications", href: "/push-notifications" },
            ]
        },
        {
            title: "Integrations",
            items: [
                { label: "API Keys", href: "/api-keys" },
                { label: "Third-Party Apps", href: "/third-party" },
            ]
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-150 ease-in-out"
                                >
                                    Back to Dashboard
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {settingsCategories.map((category, index) => (
                                    <SettingCard key={index} title={category.title} items={category.items} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Settings;
