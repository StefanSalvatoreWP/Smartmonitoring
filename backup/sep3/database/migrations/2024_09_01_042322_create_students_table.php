<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->string('student_id')->unique();
            $table->string('email')->unique();
            $table->string('phone_number');
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('zip_code');
            $table->string('country');
            $table->string('grade_level');
            $table->date('enrollment_date');
            $table->string('previous_school')->nullable();
            $table->string('guardian_name');
            $table->string('guardian_relationship');
            $table->string('guardian_phone');
            $table->string('guardian_email');
            $table->string('emergency_contact_name');
            $table->string('emergency_contact_phone');
            $table->text('medical_conditions')->nullable();
            $table->text('allergies')->nullable();
            $table->text('medications')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
}
