import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const MoreStudentInfo = ({ auth, student }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, put, processing, errors } = useForm(student);

    const formatFieldName = (fieldName) => {
        return fieldName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('students.update', student.student_id), {
            onSuccess: () => setIsEditing(false),
        });
    };

    const renderField = (key, value) => {
        if (key === 'id' || key === 'created_at' || key === 'updated_at') {
            return null;
        }

        return (
            <div key={key} className="mb-4">
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">{formatFieldName(key)}:</label>
                {isEditing ? (
                    <input
                        type="text"
                        id={key}
                        name={key}
                        value={data[key]}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                ) : (
                    <p className="mt-1 text-sm text-gray-900">{value}</p>
                )}
                {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
            </div>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Student Info - ${student.first_name} ${student.last_name}`} />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    href={route('students.info')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                    Back to All Students
                                </Link>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-150 ease-in-out"
                                >
                                    {isEditing ? 'Cancel' : 'Edit'}
                                </button>
                            </div>
                            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                                Student Information: {student.first_name} {student.last_name}
                            </h1>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(data).map(([key, value]) => renderField(key, value))}
                                </div>
                                {isEditing && (
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MoreStudentInfo;
