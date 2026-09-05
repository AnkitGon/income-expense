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
import { index, store, update, destroy } from '@/routes/transactions';
import type { Category, PaginatedData, Team, Transaction } from '@/types';

type Props = {
    transactions: PaginatedData<Transaction>;
    categories: Category[];
    filters: {
        search?: string;
        category_id?: string | number;
        from_date?: string;
        to_date?: string;
    };
};

export default function TransactionsIndex({
    transactions,
    categories,
    filters,
}: Props) {
    const page = usePage();
    const currentTeam = page.props.currentTeam as Team;

    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(
        filters.category_id != null ? String(filters.category_id) : '',
    );
    const [fromDate, setFromDate] = useState(filters.from_date || '');
    const [toDate, setToDate] = useState(filters.to_date || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] =
        useState<Transaction | null>(null);

    useEffect(() => {
        setSearch(filters.search || '');
        setCategoryId(
            filters.category_id != null ? String(filters.category_id) : '',
        );
        setFromDate(filters.from_date || '');
        setToDate(filters.to_date || '');
    }, [filters.search, filters.category_id, filters.from_date, filters.to_date]);

    const applyFilters = (overrides: {
        search?: string;
        category_id?: string;
        from_date?: string;
        to_date?: string;
    } = {}) => {
        const next = {
            search,
            category_id: categoryId,
            from_date: fromDate,
            to_date: toDate,
            ...overrides,
        };

        const params: Record<string, string> = {};

        if (next.search) {
            params.search = next.search;
        }

        if (next.category_id) {
            params.category_id = next.category_id;
        }

        if (next.from_date) {
            params.from_date = next.from_date;
        }

        if (next.to_date) {
            params.to_date = next.to_date;
        }

        router.get(index(currentTeam.slug).url, params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const handleClearSearch = () => {
        setSearch('');
        applyFilters({ search: '' });
    };

    const handleCategoryChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = e.target.value;
        setCategoryId(value);
        applyFilters({ category_id: value });
    };

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFromDate(value);
        applyFilters({ from_date: value });
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setToDate(value);
        applyFilters({ to_date: value });
    };

    const hasActiveFilters = !!(
        filters.search ||
        filters.category_id ||
        filters.from_date ||
        filters.to_date
    );

    const handleClearFilters = () => {
        setSearch('');
        setCategoryId('');
        setFromDate('');
        setToDate('');
        router.get(index(currentTeam.slug).url);
    };

    const openCreateModal = () => {
        setEditingTransaction(null);
        setModalOpen(true);
    };

    const openEditModal = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setModalOpen(true);
    };

    const openDeleteDialog = (transaction: Transaction) => {
        setTransactionToDelete(transaction);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (!transactionToDelete) return;
        router.delete(
            destroy.url({
                current_team: currentTeam.slug,
                transaction: transactionToDelete.id,
            }),
            {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setTransactionToDelete(null);
                },
            },
        );
    };

    // Format transaction date for displaying
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Format amount as currency
    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    return (
        <>
            <Head title="Transactions" />

            <div className="flex flex-col space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Transactions"
                        description="Track income and expenses for your team."
                    />

                    <Button
                        onClick={openCreateModal}
                        className="w-full sm:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" /> New Transaction
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex flex-1 items-end gap-2"
                    >
                        <div className="relative max-w-sm flex-1">
                            <Label htmlFor="search" className="sr-only">
                                Search
                            </Label>
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="search"
                                placeholder="Search description or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pr-8 pl-9"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                    </form>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                        <div className="grid gap-1.5">
                            <Label
                                htmlFor="filter-category"
                                className="text-xs text-muted-foreground"
                            >
                                Category
                            </Label>
                            <select
                                id="filter-category"
                                value={categoryId}
                                onChange={handleCategoryChange}
                                className="flex h-9 w-full min-w-44 rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden dark:border-neutral-800 dark:bg-neutral-900"
                            >
                                <option value="">All categories</option>
                                <option value="uncategorized">
                                    Uncategorized
                                </option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-1.5">
                            <Label
                                htmlFor="filter-from-date"
                                className="text-xs text-muted-foreground"
                            >
                                From
                            </Label>
                            <Input
                                id="filter-from-date"
                                type="date"
                                value={fromDate}
                                onChange={handleFromDateChange}
                                className="w-36"
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <Label
                                htmlFor="filter-to-date"
                                className="text-xs text-muted-foreground"
                            >
                                To
                            </Label>
                            <Input
                                id="filter-to-date"
                                type="date"
                                value={toDate}
                                onChange={handleToDateChange}
                                className="w-36"
                            />
                        </div>
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 items-center bg-muted/20 p-2.5 rounded-lg border">
                        <span className="text-xs font-medium text-muted-foreground">Active filters:</span>
                        {filters.search && (
                            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                Search: {filters.search}
                            </span>
                        )}
                        {filters.category_id && (
                            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                Category: {filters.category_id === 'uncategorized' ? 'Uncategorized' : (categories.find(c => c.id == filters.category_id)?.name || 'Unknown')}
                            </span>
                        )}
                        {filters.from_date && (
                            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                From: {formatDate(filters.from_date)}
                            </span>
                        )}
                        {filters.to_date && (
                            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                To: {formatDate(filters.to_date)}
                            </span>
                        )}
                        <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-7 px-2 text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/20">
                            <X className="mr-1 h-3 w-3" /> Clear all
                        </Button>
                    </div>
                )}

                {/* Listing Section */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card text-card-foreground dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 font-medium text-muted-foreground">
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {transactions.data.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="p-4 whitespace-nowrap">
                                            {formatDate(transaction.date)}
                                        </td>
                                        <td className="p-4">
                                            {transaction.category ? (
                                                <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                    {transaction.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 capitalize">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    transaction.type ===
                                                    'credit'
                                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                                                }`}
                                            >
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="p-4 font-semibold whitespace-nowrap">
                                            <span
                                                className={
                                                    transaction.type ===
                                                    'credit'
                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                        : 'text-rose-600 dark:text-rose-400'
                                                }
                                            >
                                                {transaction.type === 'credit'
                                                    ? '+'
                                                    : '-'}
                                                {formatAmount(
                                                    transaction.amount,
                                                )}
                                            </span>
                                        </td>
                                        <td className="max-w-xs truncate p-4 text-muted-foreground">
                                            {transaction.description || '-'}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        openEditModal(
                                                            transaction,
                                                        )
                                                    }
                                                    title="Edit Transaction"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    onClick={() =>
                                                        openDeleteDialog(
                                                            transaction,
                                                        )
                                                    }
                                                    title="Delete Transaction"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {transactions.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-8 text-center text-muted-foreground"
                                        >
                                            {hasActiveFilters
                                                ? 'No transactions match your filters.'
                                                : 'No transactions recorded yet. Click "New Transaction" to add one.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {transactions.total > transactions.per_page && (
                        <div className="flex flex-col items-center justify-between gap-4 border-t bg-muted/20 p-4 sm:flex-row">
                            <div className="text-sm text-muted-foreground">
                                Showing{' '}
                                <span className="font-medium">
                                    {transactions.data.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {transactions.total}
                                </span>{' '}
                                entries
                            </div>
                            <div className="flex items-center gap-1">
                                {transactions.links.map((link, idx) =>
                                    link.url ? (
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
                                    ),
                                )}
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
                            editingTransaction
                                ? `edit-${editingTransaction.id}`
                                : 'create'
                        }
                        {...(editingTransaction
                            ? update.form({
                                  current_team: currentTeam.slug,
                                  transaction: editingTransaction.id,
                              })
                            : store.form({ current_team: currentTeam.slug }))}
                        className="space-y-6"
                        onSuccess={() => setModalOpen(false)}
                    >
                        {({ errors, processing }) => (
                            <>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingTransaction
                                            ? 'Edit Transaction'
                                            : 'Record Transaction'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {editingTransaction
                                            ? 'Modify transaction details.'
                                            : 'Add a new income or expense transaction.'}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            name="date"
                                            type="date"
                                            defaultValue={
                                                editingTransaction?.date
                                                    ? new Date(
                                                          editingTransaction.date,
                                                      )
                                                          .toISOString()
                                                          .split('T')[0]
                                                    : new Date()
                                                          .toISOString()
                                                          .split('T')[0]
                                            }
                                            required
                                        />
                                        <InputError message={errors.date} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="category_id">
                                            Category
                                        </Label>
                                        <select
                                            id="category_id"
                                            name="category_id"
                                            defaultValue={
                                                editingTransaction?.category_id ??
                                                ''
                                            }
                                            className="flex h-9 w-full rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900"
                                        >
                                            <option value="">
                                                No Category
                                            </option>
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.category_id}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Type</Label>
                                        <select
                                            id="type"
                                            name="type"
                                            defaultValue={
                                                editingTransaction?.type ??
                                                'debit'
                                            }
                                            required
                                            className="flex h-9 w-full rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900"
                                        >
                                            <option value="debit">
                                                Debit (Expense)
                                            </option>
                                            <option value="credit">
                                                Credit (Income)
                                            </option>
                                        </select>
                                        <InputError message={errors.type} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="amount">
                                            Amount ($)
                                        </Label>
                                        <Input
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            defaultValue={
                                                editingTransaction?.amount ?? ''
                                            }
                                            required
                                        />
                                        <InputError message={errors.amount} />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            name="description"
                                            placeholder="e.g. Weekly grocery shopping"
                                            defaultValue={
                                                editingTransaction?.description ??
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
                                        {editingTransaction
                                            ? 'Save Changes'
                                            : 'Record Transaction'}
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
                        <DialogTitle>Delete Transaction</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this transaction of{' '}
                            <span className="font-semibold text-foreground">
                                {transactionToDelete
                                    ? formatAmount(transactionToDelete.amount)
                                    : ''}
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

TransactionsIndex.layout = (props: { currentTeam?: Team | null }) => ({
    breadcrumbs: [
        {
            title: 'Transactions',
            href: props.currentTeam ? index(props.currentTeam.slug) : '#',
        },
    ],
});
