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
        $students = Student::select('id', 'first_name', 'last_name', 'student_id')->get();
        
        // Add this line for debugging
        \Log::info('Students fetched: ' . $students->count());

        return Inertia::render('StudentInfo', [
            'allStudents' => $students
        ]);
    }
}
