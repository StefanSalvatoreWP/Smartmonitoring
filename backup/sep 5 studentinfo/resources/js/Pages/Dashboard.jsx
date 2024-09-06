// resources/js/Pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { route } from '@/ziggy'; // Ensure the correct path
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Adjust path if needed
import { Head } from '@inertiajs/react';

const Dashboard = ({ auth }) => {
    const [routesLoaded, setRoutesLoaded] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const loadRoutes = async () => {
            try {
                await fetch('/ziggy');
                setRoutesLoaded(true);
            } catch (error) {
                console.error('Error loading routes:', error);
            }
        };

        loadRoutes();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleInputChange = (e) => {
        setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send a request to your backend to create the new admin
        console.log('New admin:', { ...newAdmin, role: 'admin' });
        // Reset form and close dropdown
        setNewAdmin({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        setIsDropdownOpen(false);
    };

    if (!routesLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="flex">
               
                {/* Main Content */}
                <div className="w-4/5 py-12 px-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <p>You're logged in!</p>
                                <button 
                                    onClick={toggleDropdown}
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add New Admin
                                </button>
                                
                                {isDropdownOpen && (
                                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={newAdmin.firstName}
                                            onChange={handleInputChange}
                                            placeholder="First Name"
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={newAdmin.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Last Name"
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={newAdmin.email}
                                            onChange={handleInputChange}
                                            placeholder="Email"
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            value={newAdmin.password}
                                            onChange={handleInputChange}
                                            placeholder="Password"
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={newAdmin.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm Password"
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                        <button 
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Create Admin
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
