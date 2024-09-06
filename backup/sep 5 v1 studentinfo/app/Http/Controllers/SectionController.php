<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class SectionController extends Controller
{
    public function index(Request $request)
    {
        $sections = Section::with('subjects')->get();
        
        if ($request->wantsJson()) {
            return response()->json(['sections' => $sections]);
        }
        
        return Inertia::render('Sections', [
            'sections' => $sections
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'year' => 'required|string|max:255',
            'students' => 'required|integer',
            'subjects' => 'required|array',
            'subjects.*.name' => 'required|string|max:255',
            'subjects.*.units' => 'required|integer',
            'subjects.*.schedule' => 'required|string|max:255',
        ]);

        $section = Section::create([
            'name' => $validated['name'],
            'course' => $validated['course'],
            'year' => $validated['year'],
            'students' => $validated['students'],
        ]);

        foreach ($validated['subjects'] as $subjectData) {
            $section->subjects()->create($subjectData);
        }

        return redirect()->route('sections')->with('success', 'Section added successfully!');
    }

    public function update(Request $request, Section $section)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'year' => 'required|string|max:255',
            'students' => 'required|integer',
            'subjects' => 'required|array',
            'subjects.*.name' => 'required|string|max:255',
            'subjects.*.units' => 'required|integer',
            'subjects.*.schedule' => 'required|string|max:255',
        ]);

        $section->update([
            'name' => $validated['name'],
            'course' => $validated['course'],
            'year' => $validated['year'],
            'students' => $validated['students'],
        ]);

        // Delete existing subjects and create new ones
        $section->subjects()->delete();
        foreach ($validated['subjects'] as $subjectData) {
            $section->subjects()->create($subjectData);
        }

        return redirect()->route('sections')->with('success', 'Section updated successfully!');
    }
}
