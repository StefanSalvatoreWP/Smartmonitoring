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

    public function showStudentInfo($student_id)
    {
        $student = Student::where('student_id', $student_id)->firstOrFail();
        
        return Inertia::render('MoreStudentInfo', [
            'student' => $student
        ]);
    }

    public function update(Request $request, $student_id)
    {
        try {
            \Log::info("Attempting to update student with ID: {$student_id}");
            $student = Student::where('student_id', $student_id)->firstOrFail();
            
            $validatedData = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'role' => 'required|string|max:255',
                'date_of_birth' => 'required|date',
                'gender' => 'required|string|max:255',
                'student_id' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone_number' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'zip_code' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'grade_level' => 'required|string|max:255',
                'enrollment_date' => 'required|date',
                'previous_school' => 'nullable|string|max:255',
                'guardian_name' => 'required|string|max:255',
                'guardian_relationship' => 'required|string|max:255',
                'guardian_phone' => 'required|string|max:255',
                'guardian_email' => 'required|email|max:255',
                'emergency_contact_name' => 'required|string|max:255',
                'emergency_contact_phone' => 'required|string|max:255',
                'medical_conditions' => 'nullable|string',
                'allergies' => 'nullable|string',
                'medications' => 'nullable|string',
            ]);

            $student->update($validatedData);

            \Log::info("Student updated successfully: {$student_id}");

            return redirect()->route('students.show', $student_id)->with('success', 'Student information updated successfully.');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            \Log::error("Student not found with ID: {$student_id}");
            return response()->json(['error' => "Student not found with ID: {$student_id}"], 404);
        } catch (\Exception $e) {
            \Log::error("Error updating student {$student_id}: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
