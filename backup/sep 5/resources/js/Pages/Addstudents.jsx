import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Notification from '../Notification';  // Updated import statement

const Addstudents = ({ auth }) => {
    const [notification, setNotification] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        email: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        grade_level: '',
        enrollment_date: '',
        previous_school: '',
        guardian_name: '',
        guardian_relationship: '',
        guardian_phone: '',
        guardian_email: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        medical_conditions: '',
        allergies: '',
        medications: '',
    });

    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('students.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setNotification({ type: 'success', message: 'Student added successfully!' });
                reset(); // Reset the form
            },
            onError: (errors) => {
                setNotification({ type: 'error', message: 'Error adding student. Please try again.' });
                console.error('Error adding student:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Add Students" />
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="flex h-screen">
                {/* Main Content */}
                <div className="w-4/5 p-6 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4">Add Students</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="first_name"
                            value={data.first_name}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={data.last_name}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="date"
                            name="date_of_birth"
                            value={data.date_of_birth}
                            onChange={handleInputChange}
                            placeholder="Date of Birth"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <select
                            name="gender"
                            value={data.gender}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="tel"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="city"
                            value={data.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="state"
                            value={data.state}
                            onChange={handleInputChange}
                            placeholder="State"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="zip_code"
                            value={data.zip_code}
                            onChange={handleInputChange}
                            placeholder="Zip Code"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="country"
                            value={data.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="grade_level"
                            value={data.grade_level}
                            onChange={handleInputChange}
                            placeholder="Grade Level"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="date"
                            name="enrollment_date"
                            value={data.enrollment_date}
                            onChange={handleInputChange}
                            placeholder="Enrollment Date"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="previous_school"
                            value={data.previous_school}
                            onChange={handleInputChange}
                            placeholder="Previous School"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="guardian_name"
                            value={data.guardian_name}
                            onChange={handleInputChange}
                            placeholder="Guardian Name"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="guardian_relationship"
                            value={data.guardian_relationship}
                            onChange={handleInputChange}
                            placeholder="Guardian Relationship"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="tel"
                            name="guardian_phone"
                            value={data.guardian_phone}
                            onChange={handleInputChange}
                            placeholder="Guardian Phone"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="email"
                            name="guardian_email"
                            value={data.guardian_email}
                            onChange={handleInputChange}
                            placeholder="Guardian Email"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="text"
                            name="emergency_contact_name"
                            value={data.emergency_contact_name}
                            onChange={handleInputChange}
                            placeholder="Emergency Contact Name"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="tel"
                            name="emergency_contact_phone"
                            value={data.emergency_contact_phone}
                            onChange={handleInputChange}
                            placeholder="Emergency Contact Phone"
                            className="w-full px-3 py-2 border rounded"
                        />
                        <textarea
                            name="medical_conditions"
                            value={data.medical_conditions}
                            onChange={handleInputChange}
                            placeholder="Medical Conditions"
                            className="w-full px-3 py-2 border rounded col-span-full"
                        />
                        <textarea
                            name="allergies"
                            value={data.allergies}
                            onChange={handleInputChange}
                            placeholder="Allergies"
                            className="w-full px-3 py-2 border rounded col-span-full"
                        />
                        <textarea
                            name="medications"
                            value={data.medications}
                            onChange={handleInputChange}
                            placeholder="Medications"
                            className="w-full px-3 py-2 border rounded col-span-full"
                        />
                        <div className="col-span-full">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                disabled={processing}
                            >
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Addstudents;
