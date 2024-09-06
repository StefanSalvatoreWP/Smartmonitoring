<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'role', 'first_name', 'last_name', 'date_of_birth', 'gender',
        'email', 'phone_number', 'address', 'city',
        'state', 'zip_code', 'country', 'grade_level', 'enrollment_date',
        'previous_school', 'guardian_name', 'guardian_relationship',
        'guardian_phone', 'guardian_email', 'emergency_contact_name',
        'emergency_contact_phone', 'medical_conditions', 'allergies', 'medications'
    ];

    // If you want to ensure student_id is never mass-assigned:
    protected $guarded = ['student_id'];
}
