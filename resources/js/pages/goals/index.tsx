import { Form, Head, Link, usePage, router } from '@inertiajs/react';
import {
    Award,
    Bike,
    Calendar,
    Car,
    CheckCircle2,
    Circle,
    DollarSign,
    Flame,
    GripVertical,
    Home,
    Laptop,
    Pencil,
    Plane,
    Plus,
    Search,
    Sparkles,
    Target,
    Trash2,
    Trophy,
    X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, store, update, destroy, reorder } from '@/routes/goals';
import type { Goal, Team } from '@/types';

type Props = {
    goals: Goal[];
    counts: {
        pending: number;
        achieved: number;
        total: number;
    };
    filters: {
        status?: string;
        search?: string;
    };
};

export default function GoalsIndex({ goals: initialGoals, counts, filters }: Props) {
    const page = usePage();
    const currentTeam = page.props.currentTeam as Team;

    const [goalsList, setGoalsList] = useState<Goal[]>(initialGoals);
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

    useEffect(() => {
        setGoalsList(initialGoals);
    }, [initialGoals]);

    useEffect(() => {
        setSearch(filters.search || '');
        setStatusFilter(filters.status || 'all');
    }, [filters.search, filters.status]);

    const applyFilters = (nextStatus?: string, nextSearch?: string) => {
        const status = nextStatus !== undefined ? nextStatus : statusFilter;
        const s = nextSearch !== undefined ? nextSearch : search;

        const params: Record<string, string> = {};
        if (status && status !== 'all') params.status = status;
        if (s) params.search = s;

        router.get(index(currentTeam.slug).url, params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters(statusFilter, search);
    };

    const handleClearSearch = () => {
        setSearch('');
        applyFilters(statusFilter, '');
    };

    const handleStatusFilterChange = (status: string) => {
        setStatusFilter(status);
        applyFilters(status, search);
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '-';
        const day = d.getDate();
        const month = d.toLocaleString('en-US', { month: 'long' });
        const year = d.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const getGoalIcon = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('car') || lower.includes('vehicle') || lower.includes('auto')) return Car;
        if (lower.includes('bike') || lower.includes('cycle') || lower.includes('motor')) return Bike;
        if (lower.includes('home') || lower.includes('house') || lower.includes('flat') || lower.includes('apartment')) return Home;
        if (lower.includes('trip') || lower.includes('travel') || lower.includes('flight') || lower.includes('vacation')) return Plane;
        if (lower.includes('laptop') || lower.includes('computer') || lower.includes('phone') || lower.includes('tech')) return Laptop;
        if (lower.includes('save') || lower.includes('money') || lower.includes('fund') || lower.includes('buy')) return DollarSign;
        return Target;
    };

    const capitalize = (str: string) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleDragStart = (idx: number) => {
        setDraggedIdx(idx);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (targetIdx: number) => {
        if (draggedIdx === null || draggedIdx === targetIdx) return;

        const updated = [...goalsList];
        const [movedItem] = updated.splice(draggedIdx, 1);
        updated.splice(targetIdx, 0, movedItem);

        setGoalsList(updated);
        setDraggedIdx(null);

        const orders = updated.map((g, index) => ({
            id: g.id,
            sort_order: index + 1,
        }));

        router.post(
            reorder.url({ current_team: currentTeam.slug }),
            { orders },
            { preserveState: true, replace: true },
        );
    };

    const toggleGoalStatus = (goal: Goal) => {
        const nextStatus = goal.status === 'achieved' ? 'pending' : 'achieved';
        router.put(
            update.url({
                current_team: currentTeam.slug,
                goal: goal.id,
            }),
            {
                name: goal.name,
                description: goal.description,
                status: nextStatus,
            },
            { preserveState: true },
        );
    };

    const openCreateModal = () => {
        setEditingGoal(null);
        setModalOpen(true);
    };

    const openEditModal = (goal: Goal) => {
        setEditingGoal(goal);
        setModalOpen(true);
    };

    const openDeleteDialog = (goal: Goal) => {
        setGoalToDelete(goal);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (!goalToDelete) return;
        router.delete(
            destroy.url({
                current_team: currentTeam.slug,
                goal: goalToDelete.id,
            }),
            {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setGoalToDelete(null);
                },
            },
        );
    };

    const completionRate = counts.total > 0 ? Math.round((counts.achieved / counts.total) * 100) : 0;

    return (
        <>
            <Head title="Goals Tracker" />

            <div className="flex flex-col space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Goal Tracker"
                        description="Prioritize your financial targets, track completion milestones, and achieve your goals."
                    />

                    <Button onClick={openCreateModal} className="w-full sm:w-auto shadow-xs">
                        <Plus className="mr-2 h-4 w-4" /> New Goal
                    </Button>
                </div>

                {/* Summary Stat Cards */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-4 shadow-xs dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Total Goals</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Target className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-foreground">{counts.total}</span>
                            <span className="text-xs text-muted-foreground">goals defined</span>
                        </div>
                        <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 rounded-full"
                                style={{ width: `${counts.total > 0 ? 100 : 0}%` }}
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-4 shadow-xs dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Pending Priority</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                <Flame className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-foreground">{counts.pending}</span>
                            <span className="text-xs text-muted-foreground">goals in progress</span>
                        </div>
                        <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div
                                className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                                style={{ width: `${counts.total > 0 ? (counts.pending / counts.total) * 100 : 0}%` }}
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-4 shadow-xs dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Achieved Goals</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <Trophy className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{counts.achieved}</span>
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">({completionRate}% completed)</span>
                        </div>
                        <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                                style={{ width: `${completionRate}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Status Tabs and Search */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex rounded-lg border bg-muted/40 p-1 text-xs font-medium">
                        <button
                            onClick={() => handleStatusFilterChange('all')}
                            className={`rounded-md px-3.5 py-1.5 transition-colors ${
                                statusFilter === 'all'
                                    ? 'bg-background text-foreground shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            All ({counts.total})
                        </button>
                        <button
                            onClick={() => handleStatusFilterChange('pending')}
                            className={`rounded-md px-3.5 py-1.5 transition-colors ${
                                statusFilter === 'pending'
                                    ? 'bg-background text-foreground shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Pending ({counts.pending})
                        </button>
                        <button
                            onClick={() => handleStatusFilterChange('achieved')}
                            className={`rounded-md px-3.5 py-1.5 transition-colors ${
                                statusFilter === 'achieved'
                                    ? 'bg-background text-foreground shadow-xs'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Achieved ({counts.achieved})
                        </button>
                    </div>

                    <form
                        onSubmit={handleSearchSubmit}
                        className="relative flex max-w-sm flex-1 items-center"
                    >
                        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search goals..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pr-8 pl-9"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-3 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </form>
                </div>

                {/* Goals List */}
                <div className="space-y-3">
                    {goalsList.map((goal, idx) => {
                        const isAchieved = goal.status === 'achieved';
                        const IconComponent = getGoalIcon(goal.name);
                        const isTopPriority = idx === 0 && !isAchieved;

                        return (
                            <div
                                key={goal.id}
                                draggable
                                onDragStart={() => handleDragStart(idx)}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(idx)}
                                className={`group relative flex flex-col gap-4 rounded-xl border p-4 transition-all duration-200 shadow-xs sm:flex-row sm:items-center sm:justify-between ${
                                    isAchieved
                                        ? 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-950/60 dark:bg-emerald-950/20'
                                        : isTopPriority
                                        ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-400/30 dark:border-amber-800/60 dark:bg-amber-950/10'
                                        : 'border-sidebar-border/70 bg-card hover:border-primary/40 dark:border-sidebar-border'
                                } ${draggedIdx === idx ? 'opacity-40 scale-[0.99]' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Drag Handle */}
                                    <div
                                        className="cursor-grab active:cursor-grabbing rounded-lg p-1.5 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                                        title="Drag to reorder priority"
                                    >
                                        <GripVertical className="h-5 w-5" />
                                    </div>

                                    {/* Icon Avatar */}
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                            isAchieved
                                                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                                                : isTopPriority
                                                ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                                                : 'bg-primary/10 text-primary'
                                        }`}
                                    >
                                        <IconComponent className="h-5 w-5" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`text-base font-semibold ${isAchieved ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                                {capitalize(goal.name)}
                                            </span>

                                            {/* Priority Badge */}
                                            {isAchieved ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                                    <Trophy className="h-3 w-3" /> Achieved
                                                </span>
                                            ) : isTopPriority ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                                                    <Sparkles className="h-3 w-3" /> #1 Top Priority
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                                    Priority #{idx + 1}
                                                </span>
                                            )}
                                        </div>

                                        {goal.description && (
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {goal.description}
                                            </p>
                                        )}

                                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                <span>Created: </span>
                                                <span className="font-medium text-foreground">
                                                    {formatDate(goal.created_at)}
                                                </span>
                                            </div>

                                            {isAchieved && goal.achieved_at && (
                                                <div className="flex items-center gap-1">
                                                    <Award className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Achieved: </span>
                                                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                                                        {formatDate(goal.achieved_at)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Action Buttons */}
                                <div className="flex items-center justify-end gap-2 border-t pt-3 sm:border-t-0 sm:pt-0">
                                    <Button
                                        variant={isAchieved ? "outline" : "default"}
                                        size="sm"
                                        onClick={() => toggleGoalStatus(goal)}
                                        className={`gap-1.5 text-xs font-medium ${
                                            isAchieved
                                                ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/30'
                                                : ''
                                        }`}
                                    >
                                        {isAchieved ? (
                                            <>
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Completed
                                            </>
                                        ) : (
                                            <>
                                                <Circle className="h-3.5 w-3.5" /> Mark Achieved
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openEditModal(goal)}
                                        title="Edit Goal"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        onClick={() => openDeleteDialog(goal)}
                                        title="Delete Goal"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}

                    {goalsList.length === 0 && (
                        <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
                            <Target className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-3 text-lg font-semibold text-foreground">No goals found</h3>
                            <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
                                {search
                                    ? 'No goals match your search term.'
                                    : 'Start tracking your financial and personal goals by creating your first goal.'}
                            </p>
                            <Button onClick={openCreateModal} className="mt-5 shadow-xs">
                                <Plus className="mr-2 h-4 w-4" /> Create First Goal
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Edit Dialog */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <Form
                        key={editingGoal ? `edit-${editingGoal.id}` : 'create'}
                        {...(editingGoal
                            ? update.form({
                                  current_team: currentTeam.slug,
                                  goal: editingGoal.id,
                              })
                            : store.form({ current_team: currentTeam.slug }))}
                        className="space-y-6"
                        onSuccess={() => setModalOpen(false)}
                    >
                        {({ errors, processing }) => (
                            <>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {editingGoal
                                            ? 'Update goal details and milestone status.'
                                            : 'Define a new target goal to track and prioritize.'}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Goal Name <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="e.g. Car, Home, Vacation, Emergency Fund"
                                            defaultValue={editingGoal?.name ?? ''}
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Notes / Target Details (Optional)</Label>
                                        <Input
                                            id="description"
                                            name="description"
                                            placeholder="e.g. Save $15,000 for down payment"
                                            defaultValue={editingGoal?.description ?? ''}
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    {editingGoal && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="status">Status</Label>
                                            <select
                                                id="status"
                                                name="status"
                                                defaultValue={editingGoal.status}
                                                className="flex h-9 w-full rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden dark:border-neutral-800 dark:bg-neutral-900 font-medium"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="achieved">Achieved</option>
                                            </select>
                                            <InputError message={errors.status} />
                                        </div>
                                    )}
                                </div>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing}>
                                        {editingGoal ? 'Save Changes' : 'Create Goal'}
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Goal</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the goal{' '}
                            <span className="font-semibold text-foreground">
                                "{goalToDelete ? capitalize(goalToDelete.name) : ''}"
                            </span>
                            ? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

GoalsIndex.layout = (props: { currentTeam?: Team | null }) => ({
    breadcrumbs: [
        {
            title: 'Goals',
            href: props.currentTeam ? index(props.currentTeam.slug) : '#',
        },
    ],
});
