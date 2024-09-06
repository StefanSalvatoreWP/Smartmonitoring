import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from '@/ziggy';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const MoreStudentInfo = ({ auth, student }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [confirmLastName, setConfirmLastName] = useState('');
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const { data, setData, put, processing, errors, reset } = useForm(student);

    const formatFieldName = (fieldName) => {
        return fieldName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (confirmLastName !== student.last_name) {
            alert("Please enter the correct last name to update.");
            return;
        }
        console.log('Submitting data:', data);
        put(route('students.update', data.student_id), {
            onSuccess: () => {
                setIsEditing(false);
                setConfirmLastName('');
                setShowSuccessAnimation(true);
                setTimeout(() => setShowSuccessAnimation(false), 3000);
                console.log('Update successful');
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
            },
        });
    };

    const renderField = (key, value) => {
        if (key === 'id' || key === 'created_at' || key === 'updated_at') {
            return null;
        }

        return (
            <div key={key} className="mb-2">
                <label htmlFor={key} className="block text-xs font-medium text-gray-700">{formatFieldName(key)}:</label>
                {isEditing ? (
                    <input
                        type="text"
                        id={key}
                        name={key}
                        value={data[key]}
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                ) : (
                    <p className="mt-1 text-sm p-1 bg-gray-100 rounded">{value}</p>
                )}
                {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
            </div>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Student Info - ${student.first_name} ${student.last_name}`} />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <Link
                                    href={route('students.info')}
                                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                    Back to All Students
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsEditing(!isEditing);
                                        if (!isEditing) {
                                            reset();
                                            setConfirmLastName('');
                                        }
                                    }}
                                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-700 transition duration-150 ease-in-out"
                                >
                                    {isEditing ? 'Cancel' : 'Edit'}
                                </button>
                            </div>
                            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                                Student Information: {student.first_name} {student.last_name}
                            </h1>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-2">
                                        {Object.entries(data).map(([key, value]) => renderField(key, value))}
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="mt-4">
                                        <label htmlFor="confirmLastName" className="block text-sm font-medium text-gray-700">
                                            Confirm Last Name to Update:
                                        </label>
                                        <input
                                            type="text"
                                            id="confirmLastName"
                                            value={confirmLastName}
                                            onChange={(e) => setConfirmLastName(e.target.value)}
                                            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            placeholder="Enter last name to confirm update"
                                        />
                                        <button
                                            type="submit"
                                            disabled={processing || confirmLastName !== student.last_name}
                                            className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out disabled:opacity-50"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                            {showSuccessAnimation && (
                                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white rounded-lg p-6 flex items-center">
                                        <CheckCircleIcon className="h-8 w-8 text-green-500 mr-2" />
                                        <span className="text-lg font-semibold">Update Successful!</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MoreStudentInfo;
