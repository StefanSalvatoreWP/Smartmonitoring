import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const StudentInfo = ({ auth, allStudents }) => {
    console.log('allStudents:', allStudents); // Add this line for debugging

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Student Info" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-semibold mb-4">Student Information</h1>
                            {allStudents && allStudents.length > 0 ? (
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">All Students</h2>
                                    <ul className="list-disc pl-5">
                                        {allStudents.map(student => (
                                            <li key={student.id} className="mb-1">
                                                {student.first_name} {student.last_name} (ID: {student.student_id})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No students found. Total: {allStudents ? allStudents.length : 0}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudentInfo;
