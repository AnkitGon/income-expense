import { Form, Head, Link, usePage, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, X } from 'lucide-react';
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
import { index, store, update, destroy } from '@/routes/categories';
import type { Category, PaginatedData, Team } from '@/types';

type Props = {
    categories: PaginatedData<Category>;
    filters: {
        search?: string;
    };
};

export default function CategoriesIndex({ categories, filters }: Props) {
    const page = usePage();
    const currentTeam = page.props.currentTeam as Team;

    const [search, setSearch] = useState(filters.search || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null,
    );
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null,
    );

    // Synchronize filters search with local state
    useEffect(() => {
        setSearch(filters.search || '');
    }, [filters.search]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            index(currentTeam.slug).url,
            { search },
            { preserveState: true, replace: true },
        );
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get(
            index(currentTeam.slug).url,
            { search: '' },
            { preserveState: true, replace: true },
        );
    };

    const openCreateModal = () => {
        setEditingCategory(null);
        setModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setModalOpen(true);
    };

    const openDeleteDialog = (category: Category) => {
        setCategoryToDelete(category);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (!categoryToDelete) return;
        router.delete(
            destroy.url({
                current_team: currentTeam.slug,
                category: categoryToDelete.id,
            }),
            {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setCategoryToDelete(null);
                },
            },
        );
    };

    return (
        <>
            <Head title="Categories" />

            <div className="flex flex-col space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Categories"
                        description="Manage your custom income and expense categories."
                    />

                    <Button
                        onClick={openCreateModal}
                        className="w-full sm:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" /> New Category
                    </Button>
                </div>

                {/* Filters / Search Bar */}
                <div className="flex items-center gap-2">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="relative flex max-w-sm flex-1 items-center"
                    >
                        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search categories..."
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
                    <Button onClick={handleSearchSubmit} variant="secondary">
                        Search
                    </Button>
                </div>

                {/* Listing Section */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card text-card-foreground dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 font-medium text-muted-foreground">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Created At</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {categories.data.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="p-4 font-medium">
                                            {category.name}
                                        </td>
                                        <td className="max-w-xs truncate p-4 text-muted-foreground">
                                            {category.description || '-'}
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {new Date(
                                                category.created_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        openEditModal(category)
                                                    }
                                                    title="Edit Category"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    onClick={() =>
                                                        openDeleteDialog(
                                                            category,
                                                        )
                                                    }
                                                    title="Delete Category"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {categories.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="p-8 text-center text-muted-foreground"
                                        >
                                            No categories found. Create one to
                                            get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {categories.total > categories.per_page && (
                        <div className="flex flex-col items-center justify-between gap-4 border-t bg-muted/20 p-4 sm:flex-row">
                            <div className="text-sm text-muted-foreground">
                                Showing{' '}
                                <span className="font-medium">
                                    {categories.data.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {categories.total}
                                </span>{' '}
                                entries
                            </div>
                            <div className="flex items-center gap-1">
                                {categories.links.map((link, idx) => {
                                    const isPageNumber = !isNaN(
                                        Number(link.label),
                                    );
                                    const isPrevNext =
                                        link.label.includes('Previous') ||
                                        link.label.includes('Next');

                                    return link.url ? (
                                        <Link
                                            key={idx}
                                            href={link.url}
                                            preserveState
                                            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                                                link.active
                                                    ? 'border-primary bg-primary text-primary-foreground'
                                                    : 'border-sidebar-border bg-background text-foreground hover:bg-muted'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ) : (
                                        <span
                                            key={idx}
                                            className="cursor-not-allowed rounded-md border border-sidebar-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <Form
                        key={
                            editingCategory
                                ? `edit-${editingCategory.id}`
                                : 'create'
                        }
                        {...(editingCategory
                            ? update.form({
                                  current_team: currentTeam.slug,
                                  category: editingCategory.id,
                              })
                            : store.form({ current_team: currentTeam.slug }))}
                        className="space-y-6"
                        onSuccess={() => setModalOpen(false)}
                    >
                        {({ errors, processing }) => (
                            <>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingCategory
                                            ? 'Edit Category'
                                            : 'Create Category'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {editingCategory
                                            ? 'Modify category details.'
                                            : 'Add a new category to group your transactions.'}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="e.g. Groceries"
                                            defaultValue={
                                                editingCategory?.name ?? ''
                                            }
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            name="description"
                                            placeholder="e.g. Household food and groceries expenses"
                                            defaultValue={
                                                editingCategory?.description ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
                                    </div>
                                </div>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing}>
                                        {editingCategory
                                            ? 'Save Changes'
                                            : 'Create Category'}
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
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the category{' '}
                            <span className="font-semibold text-foreground">
                                "{categoryToDelete?.name}"
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

CategoriesIndex.layout = (props: { currentTeam?: Team | null }) => ({
    breadcrumbs: [
        {
            title: 'Categories',
            href: props.currentTeam ? index(props.currentTeam.slug) : '#',
        },
    ],
});
