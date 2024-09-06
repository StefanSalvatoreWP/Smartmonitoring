import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const StudentSchedule = ({ auth, student_id }) => {
    const [student, setStudent] = useState(null);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (student_id) {
            // Fetch student and subjects data here
            // You can use axios or fetch API to get data from your backend
            console.log("Fetching data for student ID:", student_id);
        }
    }, [student_id]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Student Schedule" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold">Student Schedule</h1>
                                <Link
                                    href={route('students.show', { student_id: student_id })}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                    Back to Student Info
                                </Link>
                            </div>
                            <p>Student ID: {student_id}</p>
                            {student ? (
                                <p>Schedule for {student.first_name} {student.last_name}</p>
                            ) : (
                                <p>Loading student information...</p>
                            )}
                            {/* Add more UI components to display the schedule */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudentSchedule;
