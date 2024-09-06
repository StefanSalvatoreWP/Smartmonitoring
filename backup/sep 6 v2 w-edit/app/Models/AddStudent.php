<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddStudent extends Model
{
    use HasFactory;

    protected $table = 'students'; // Assuming the table name is 'students'

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    protected $fillable = [
        'role', // Add this line
        'student_id',
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'email',
        'phone_number',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'grade_level',
        'enrollment_date',
        'previous_school',
        'guardian_name',
        'guardian_relationship',
        'guardian_phone',
        'guardian_email',
        'emergency_contact_name',
        'emergency_contact_phone',
        'medical_conditions',
        'allergies',
        'medications',
    ];

    protected $dates = [
        'date_of_birth',
        'enrollment_date',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'enrollment_date' => 'date',
    ];

    // You might want to add a default value for the role
    protected $attributes = [
        'role' => 'student',
    ];
}
