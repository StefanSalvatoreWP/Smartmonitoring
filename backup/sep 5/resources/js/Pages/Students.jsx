import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { route } from '../ziggy'; // Ensure the correct path
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Adjust path if needed
import { Head } from '@inertiajs/react';

const Students = ({ auth }) => {
  const [routesLoaded, setRoutesLoaded] = useState(false);

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

  if (!routesLoaded) {
    return <div>Loading...</div>;
  }

  // Sample data, replace this with your actual data or fetch it from an API
  const students = [
    { id: 1, name: 'Alex', email: 'alex@gmail.com',  timein: '08:00 AM', timeout: '04:00 PM', logdate: '2024-08-26' },
    { id: 2, name: 'Glen', email: 'glen@gmail.com',  timein: '09:00 AM', timeout: '05:00 PM', logdate: '2024-08-26' },
    // Add more student data as needed
  ];

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Students" />
      <div className="flex">
        {/* Sidebar */}
        
        {/* Main Content */}
        <div className="w-4/5 py-12 px-6">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">
                <h1 className="text-2xl font-semibold mb-4">Students</h1>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 border-r">ID</th>
                        <th className="py-2 px-4 border-r">Name</th>
                        <th className="py-2 px-4 border-r">Email</th>
                        <th className="py-2 px-4 border-r">Time In</th>
                        <th className="py-2 px-4 border-r">Time Out</th>
                        <th className="py-2 px-4">Log Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id} className="border-b">
                          <td className="py-2 px-4 border-r">{student.id}</td>
                          <td className="py-2 px-4 border-r">{student.name}</td>
                          <td className="py-2 px-4 border-r">{student.email}</td>
                          <td className="py-2 px-4 border-r">{student.timein}</td>
                          <td className="py-2 px-4 border-r">{student.timeout}</td>
                          <td className="py-2 px-4">{student.logdate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Students;
