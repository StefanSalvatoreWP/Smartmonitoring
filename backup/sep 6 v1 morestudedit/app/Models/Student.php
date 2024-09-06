<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'role', 'first_name', 'last_name', 'date_of_birth', 'gender',
        'student_id', 'email', 'phone_number', 'address', 'city',
        'state', 'zip_code', 'country', 'grade_level', 'enrollment_date',
        'previous_school', 'guardian_name'
    ];
}
