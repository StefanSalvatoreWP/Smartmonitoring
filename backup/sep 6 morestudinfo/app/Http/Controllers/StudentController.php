<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('Students');
    }

    public function info()
    {
        $students = Student::all();
        
        // Add this line for debugging
        \Log::info('Students fetched: ' . $students->count());

        return Inertia::render('StudentInfo', [
            'allStudents' => $students
        ]);
    }

    public function showStudentInfo($studentId)
    {
        $student = Student::where('student_id', $studentId)->firstOrFail();
        
        return Inertia::render('MoreStudentInfo', [
            'student' => $student
        ]);
    }
}
