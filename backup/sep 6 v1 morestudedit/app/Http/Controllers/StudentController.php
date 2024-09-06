<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function update(Request $request, $studentId)
    {
        $student = Student::where('student_id', $studentId)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:students,email,' . $student->id,
            // Add other validation rules as needed
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $student->update($request->all());

        return redirect()->back()->with('success', 'Student information updated successfully.');
    }
}
