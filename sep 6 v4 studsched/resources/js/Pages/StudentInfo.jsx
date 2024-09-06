import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaEye, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const StudentInfo = ({ auth, allStudents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredStudents = allStudents.filter(student => 
        student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toString().includes(searchTerm)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Student Info" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href={route('students')}
                                className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                            >
                                Back to Students
                            </Link>
                            <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Information</h1>
                            
                            {/* Search bar */}
                            <div className="mb-4 relative">
                                <input
                                    type="text"
                                    placeholder="Search by name or ID"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaSearch className="absolute right-3 top-3 text-gray-400" />
                            </div>

                            {filteredStudents.length > 0 ? (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Students</h2>
                                    <ul className="space-y-3">
                                        {currentStudents.map(student => (
                                            <li key={student.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-150 ease-in-out">
                                                <span className="text-lg text-gray-700">
                                                    {student.first_name} {student.last_name} 
                                                    <span className="ml-2 text-sm text-gray-500">(ID: {student.student_id})</span>
                                                </span>
                                                <Link
                                                    href={route('students.show', student.student_id)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                                                >
                                                    <FaEye />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 flex justify-between items-center">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out disabled:opacity-50"
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        <span>Page {currentPage} of {totalPages}</span>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out disabled:opacity-50"
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-lg text-gray-600">No students found. Total: {filteredStudents.length}</p>
                            )}

                            {selectedStudent && (
                                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">Detailed Student Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(selectedStudent).map(([key, value]) => (
                                            <p key={key} className="mb-2">
                                                <strong>{formatFieldName(key)}:</strong> {value}
                                            </p>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => setSelectedStudent(null)}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudentInfo;
