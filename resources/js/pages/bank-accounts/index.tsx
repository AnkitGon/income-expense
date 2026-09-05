import { Form, Head, Link, usePage, router } from '@inertiajs/react';
import { Landmark, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
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
import { index, store, update, destroy } from '@/routes/bank-accounts';
import type { BankAccount, PaginatedData, Team } from '@/types';

type Props = {
    bankAccounts: PaginatedData<BankAccount>;
    filters: {
        search?: string;
    };
};

export default function BankAccountsIndex({ bankAccounts, filters }: Props) {
    const page = usePage();
    const currentTeam = page.props.currentTeam as Team;

    const [search, setSearch] = useState(filters.search || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState<BankAccount | null>(null);

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
        setEditingAccount(null);
        setModalOpen(true);
    };

    const openEditModal = (account: BankAccount) => {
        setEditingAccount(account);
        setModalOpen(true);
    };

    const openDeleteDialog = (account: BankAccount) => {
        setAccountToDelete(account);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (!accountToDelete) return;
        router.delete(
            destroy.url({
                current_team: currentTeam.slug,
                bank_account: accountToDelete.id,
            }),
            {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setAccountToDelete(null);
                },
            },
        );
    };

    return (
        <>
            <Head title="Bank Accounts" />

            <div className="flex flex-col space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Bank Accounts"
                        description="Manage your bank accounts and financial institutions."
                    />

                    <Button onClick={openCreateModal} className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> New Bank Account
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="flex items-center gap-2">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="relative flex max-w-sm flex-1 items-center"
                    >
                        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search bank accounts..."
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

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card text-card-foreground dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 font-medium text-muted-foreground">
                                    <th className="p-4">Account Name</th>
                                    <th className="p-4">Bank Name</th>
                                    <th className="p-4">Account Number / Ref</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Transactions</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {bankAccounts.data.map((account) => (
                                    <tr
                                        key={account.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="p-4 font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <Landmark className="h-4 w-4" />
                                                </div>
                                                <span>{account.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-foreground font-medium">
                                            {account.bank_name}
                                        </td>
                                        <td className="p-4 font-mono text-xs text-muted-foreground">
                                            {account.account_number || '-'}
                                        </td>
                                        <td className="max-w-xs truncate p-4 text-muted-foreground">
                                            {account.description || '-'}
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {account.transactions_count ?? 0}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditModal(account)}
                                                    title="Edit Bank Account"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    onClick={() => openDeleteDialog(account)}
                                                    title="Delete Bank Account"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {bankAccounts.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-8 text-center text-muted-foreground"
                                        >
                                            No bank accounts found. Create one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {bankAccounts.total > bankAccounts.per_page && (
                        <div className="flex flex-col items-center justify-between gap-4 border-t bg-muted/20 p-4 sm:flex-row">
                            <div className="text-sm text-muted-foreground">
                                Showing{' '}
                                <span className="font-medium">{bankAccounts.data.length}</span> of{' '}
                                <span className="font-medium">{bankAccounts.total}</span> entries
                            </div>
                            <div className="flex items-center gap-1">
                                {bankAccounts.links.map((link, idx) => (
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
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={idx}
                                            className="cursor-not-allowed rounded-md border border-sidebar-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <Form
                        key={editingAccount ? `edit-${editingAccount.id}` : 'create'}
                        {...(editingAccount
                            ? update.form({
                                  current_team: currentTeam.slug,
                                  bank_account: editingAccount.id,
                              })
                            : store.form({ current_team: currentTeam.slug }))}
                        className="space-y-6"
                        onSuccess={() => setModalOpen(false)}
                    >
                        {({ errors, processing }) => (
                            <>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingAccount ? 'Edit Bank Account' : 'Create Bank Account'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {editingAccount
                                            ? 'Modify bank account details.'
                                            : 'Add a new bank account for mapping transactions.'}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Account Label / Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="e.g. Main Operating Checking"
                                            defaultValue={editingAccount?.name ?? ''}
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="bank_name">Bank / Institution Name</Label>
                                        <Input
                                            id="bank_name"
                                            name="bank_name"
                                            placeholder="e.g. Chase Bank, HSBC, Barclays"
                                            defaultValue={editingAccount?.bank_name ?? ''}
                                            required
                                        />
                                        <InputError message={errors.bank_name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="account_number">Account Number / Reference (Optional)</Label>
                                        <Input
                                            id="account_number"
                                            name="account_number"
                                            placeholder="e.g. ****4589"
                                            defaultValue={editingAccount?.account_number ?? ''}
                                        />
                                        <InputError message={errors.account_number} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Notes / Description (Optional)</Label>
                                        <Input
                                            id="description"
                                            name="description"
                                            placeholder="e.g. Primary business account for operational expenses"
                                            defaultValue={editingAccount?.description ?? ''}
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                </div>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing}>
                                        {editingAccount ? 'Save Changes' : 'Create Bank Account'}
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
                        <DialogTitle>Delete Bank Account</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the bank account{' '}
                            <span className="font-semibold text-foreground">
                                "{accountToDelete?.name}"
                            </span>
                            ? Associated transactions will also be removed. This action cannot be undone.
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

BankAccountsIndex.layout = (props: { currentTeam?: Team | null }) => ({
    breadcrumbs: [
        {
            title: 'Bank Accounts',
            href: props.currentTeam ? index(props.currentTeam.slug) : '#',
        },
    ],
});
