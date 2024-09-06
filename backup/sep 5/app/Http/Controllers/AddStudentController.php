<?php

namespace App\Http\Controllers;

use App\Models\AddStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AddStudentController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'email' => 'required|email|unique:students,email',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
            'grade_level' => 'required|string|max:50',
            'enrollment_date' => 'required|date',
            'previous_school' => 'nullable|string|max:255',
            'guardian_name' => 'required|string|max:255',
            'guardian_relationship' => 'required|string|max:100',
            'guardian_phone' => 'required|string|max:20',
            'guardian_email' => 'required|email',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_phone' => 'required|string|max:20',
            'medical_conditions' => 'nullable|string',
            'allergies' => 'nullable|string',
            'medications' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return Inertia::render('Addstudents', [
                'errors' => $validator->errors(),
            ])->withViewData(['message' => 'Validation failed']);
        }

        $validatedData = $validator->validated();

        // Generate student_id
        $latestStudent = AddStudent::latest('id')->first();
        $latestId = $latestStudent ? $latestStudent->id : 0;
        $newId = $latestId + 1;
        $validatedData['student_id'] = date('Y') . str_pad($newId, 4, '0', STR_PAD_LEFT);

        // Add role to validated data
        $validatedData['role'] = 'student';

        $student = AddStudent::create($validatedData);

        return Inertia::render('Addstudents', [
            'message' => 'Student added successfully',
            'student' => $student,
        ])->withViewData(['message' => 'Student added successfully']);
    }
}
