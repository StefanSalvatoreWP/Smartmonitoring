import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const MoreStudentInfo = ({ auth, student }) => {
    const formatFieldName = (fieldName) => {
        return fieldName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Student Info - ${student.first_name} ${student.last_name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href={route('students.info')}
                                className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                            >
                                Back to All Students
                            </Link>
                            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                                Student Information: {student.first_name} {student.last_name}
                            </h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(student).map(([key, value]) => (
                                    <p key={key} className="mb-2">
                                        <strong>{formatFieldName(key)}:</strong> {value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MoreStudentInfo;
