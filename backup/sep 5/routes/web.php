<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AddStudentController;
use App\Http\Controllers\SectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Tightenco\Ziggy\Ziggy;

// Route for the homepage (Mainpage)
Route::get('/', function () {
    return Inertia::render('Mainpage');
})->name('mainpage');

// Route for the dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes for authenticated users
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authenticated and verified routes for Ziggy integration
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    
    Route::get('/addstudents', function () {
        return Inertia::render('Addstudents'); // Ensure this component exists
    })->name('addstudents');
    
    Route::get('/students', function () {
        return Inertia::render('Students'); // Ensure this component exists
    })->name('students');
    
    Route::get('/settings', function () {
        return Inertia::render('Settings'); // Ensure this component exists
    })->name('settings');

    Route::get('/student/login', function () {
        return Inertia::render('StudentLogin'); // Ensure this component exists
    })->name('student.login');
    Route::get('/sections', function () {
        return Inertia::render('Sections'); // Ensure this component exists
    })->name('addstudents');
});

// Route to serve Ziggy route list
Route::get('/ziggy', function () {
    return response()->json((new Ziggy)->toArray());
});

// Route to add students
Route::post('/students', [AddStudentController::class, 'store'])->name('students.store');

// Route for sections
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/sections', [SectionController::class, 'index'])->name('sections');
    Route::post('/sections', [SectionController::class, 'store'])->name('sections.store');
    Route::put('/sections/{section}', [SectionController::class, 'update'])->name('sections.update');
});

require __DIR__.'/auth.php';
