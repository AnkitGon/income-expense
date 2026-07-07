<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index(Request $request, Team $current_team): Response
    {
        $categories = $current_team->categories()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('categories/index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request, Team $current_team): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $current_team->categories()->create($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Category created successfully.'),
        ]);

        return back();
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, Team $current_team, Category $category): RedirectResponse
    {
        abort_unless($category->team_id === $current_team->id, 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $category->update($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Category updated successfully.'),
        ]);

        return back();
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Request $request, Team $current_team, Category $category): RedirectResponse
    {
        abort_unless($category->team_id === $current_team->id, 403);

        $category->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Category deleted successfully.'),
        ]);

        return back();
    }
}
