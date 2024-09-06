import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ErrorBoundary from '@/Components/ErrorBoundary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sections({ auth, sections: initialSections = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [subjects, setSubjects] = useState([{ name: '', units: '', schedule: '' }]);
    const [sections, setSections] = useState(initialSections);
    const [confirmationInput, setConfirmationInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const sectionsPerPage = 4;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        course: '',
        year: '',
        students: '',
        subjects: [],
    });

    useEffect(() => {
        if (sections.length === 0) {
            fetchSections();
        }
    }, []);

    const fetchSections = async () => {
        try {
            const response = await fetch('/sections', {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSections(data.sections || []);
        } catch (error) {
            console.error('Error fetching sections:', error);
            setSections([]);
        }
    };

    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
        setData('subjects', newSubjects);
    };

    const addSubject = () => {
        setSubjects([...subjects, { name: '', units: '', schedule: '' }]);
    };

    const removeSubject = (index) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
        setData('subjects', newSubjects);
    };

    const openEditModal = (section) => {
        setIsEditMode(true);
        setEditingSectionId(section.id);
        setData({
            name: section.name,
            course: section.course,
            year: section.year,
            students: section.students,
            subjects: section.subjects,
        });
        setSubjects(section.subjects);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            if (confirmationInput !== data.name) {
                toast.error('Section name does not match. Changes not saved.');
                return;
            }
            put(route('sections.update', editingSectionId), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                    setSubjects([{ name: '', units: '', schedule: '' }]);
                    setIsEditMode(false);
                    setEditingSectionId(null);
                    setConfirmationInput('');
                    toast.success('Section updated successfully!');
                    fetchSections();
                },
            });
        } else {
            post(route('sections.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                    setSubjects([{ name: '', units: '', schedule: '' }]);
                    toast.success('Section added successfully!');
                    fetchSections();
                },
            });
        }
    };

    const filteredSections = sections.filter(section =>
        section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastSection = currentPage * sectionsPerPage;
    const indexOfFirstSection = indexOfLastSection - sectionsPerPage;
    const currentSections = filteredSections.slice(indexOfFirstSection, indexOfLastSection);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Sections" />
            <ErrorBoundary>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-semibold">Sections</h1>
                                    <button
                                        onClick={() => {
                                            setIsEditMode(false);
                                            setIsModalOpen(true);
                                            reset();
                                            setSubjects([{ name: '', units: '', schedule: '' }]);
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add Section
                                    </button>
                                </div>
                                
                                <input
                                    type="text"
                                    placeholder="Search sections..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-2 mb-4 border rounded"
                                />

                                {currentSections && currentSections.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {currentSections.map((section) => (
                                            <div key={section.id} className="border rounded-lg p-4 shadow-sm">
                                                <h2 className="text-xl font-semibold mb-2">{section.name}</h2>
                                                <p className="text-sm text-gray-600 mb-1">{section.course}</p>
                                                <p className="text-sm text-gray-600 mb-2">{section.year} - {section.students} students</p>
                                                <h3 className="font-semibold mt-4 mb-2">Subjects:</h3>
                                                <ul className="text-sm">
                                                    {section.subjects && section.subjects.map((subject, index) => (
                                                        <li key={index} className="mb-1">
                                                            {subject.name} - {subject.units} units - {subject.schedule}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button
                                                    onClick={() => openEditModal(section)}
                                                    className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No sections available. Add a new section to get started.</p>
                                )}

                                <div className="mt-6 flex justify-between items-center">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                    >
                                        Previous
                                    </button>
                                    <span>Page {currentPage} of {Math.ceil(filteredSections.length / sectionsPerPage)}</span>
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={indexOfLastSection >= filteredSections.length}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                        <div className="relative top-20 mx-auto p-5 border w-[480px] shadow-lg rounded-md bg-white">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                                {isEditMode ? 'Edit Section' : 'Add New Section'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Section Name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Course"
                                    value={data.course}
                                    onChange={(e) => setData('course', e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Number of Students"
                                    value={data.students}
                                    onChange={(e) => setData('students', e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                
                                <div className="space-y-3">
                                    {subjects.map((subject, index) => (
                                        <div key={index} className="flex flex-wrap items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Subject Name"
                                                value={subject.name}
                                                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                                className="flex-grow min-w-[200px] p-2 border rounded"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Units"
                                                value={subject.units}
                                                onChange={(e) => handleSubjectChange(index, 'units', e.target.value)}
                                                className="w-16 p-2 border rounded"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Schedule"
                                                value={subject.schedule}
                                                onChange={(e) => handleSubjectChange(index, 'schedule', e.target.value)}
                                                className="flex-grow min-w-[150px] p-2 border rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSubject(index)}
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={addSubject}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Add Subject
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        {isEditMode ? 'Update' : 'Submit'}
                                    </button>
                                </div>
                                
                                {isEditMode && (
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            placeholder="Type section name to confirm"
                                            value={confirmationInput}
                                            onChange={(e) => setConfirmationInput(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                )}
                            </form>
                            
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setIsEditMode(false);
                                    setEditingSectionId(null);
                                    setConfirmationInput('');
                                    reset();
                                }}
                                className="w-full mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                <ToastContainer />
            </ErrorBoundary>
        </AuthenticatedLayout>
    );
}
