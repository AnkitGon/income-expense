<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class GoalController extends Controller
{
    /**
     * Display a listing of goals.
     */
    public function index(Request $request, Team $current_team): Response
    {
        $status = $request->input('status', 'all');

        $goals = $current_team->goals()
            ->when($status === 'pending', fn ($query) => $query->where('status', 'pending'))
            ->when($status === 'achieved', fn ($query) => $query->where('status', 'achieved'))
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        $pendingCount = $current_team->goals()->where('status', 'pending')->count();
        $achievedCount = $current_team->goals()->where('status', 'achieved')->count();

        return Inertia::render('goals/index', [
            'goals' => $goals,
            'counts' => [
                'pending' => $pendingCount,
                'achieved' => $achievedCount,
                'total' => $pendingCount + $achievedCount,
            ],
            'filters' => [
                'status' => $status,
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    /**
     * Store a newly created goal.
     */
    public function store(Request $request, Team $current_team): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $maxSortOrder = (int) $current_team->goals()->max('sort_order');
        $validated['sort_order'] = $maxSortOrder + 1;
        $validated['status'] = 'pending';

        $current_team->goals()->create($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Goal created successfully.'),
        ]);

        return back();
    }

    /**
     * Update the specified goal.
     */
    public function update(Request $request, Team $current_team, Goal $goal): RedirectResponse
    {
        abort_unless($goal->team_id === $current_team->id, 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', 'string', Rule::in(['pending', 'achieved'])],
        ]);

        if ($validated['status'] === 'achieved' && $goal->status !== 'achieved') {
            $validated['achieved_at'] = now();
        } elseif ($validated['status'] === 'pending') {
            $validated['achieved_at'] = null;
        }

        $goal->update($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $validated['status'] === 'achieved'
                ? __('Goal marked as achieved!')
                : __('Goal updated successfully.'),
        ]);

        return back();
    }

    /**
     * Remove the specified goal.
     */
    public function destroy(Request $request, Team $current_team, Goal $goal): RedirectResponse
    {
        abort_unless($goal->team_id === $current_team->id, 403);

        $goal->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Goal deleted successfully.'),
        ]);

        return back();
    }

    /**
     * Reorder goals priority.
     */
    public function reorder(Request $request, Team $current_team): RedirectResponse
    {
        $validated = $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', Rule::exists('goals', 'id')->where('team_id', $current_team->id)],
            'orders.*.sort_order' => ['required', 'integer', 'min:0'],
        ]);

        foreach ($validated['orders'] as $item) {
            $current_team->goals()
                ->where('id', $item['id'])
                ->update(['sort_order' => $item['sort_order']]);
        }

        return back();
    }
}
