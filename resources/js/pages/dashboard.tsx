import { Head, Link, router, usePage } from '@inertiajs/react';
import { Landmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import Heading from '@/components/heading';
import { dashboard } from '@/routes';
import { index as transactionsIndex } from '@/routes/transactions';
import type { BankAccount, DashboardInvitation, Team } from '@/types';

type CategorySummary = {
    id: number | null;
    name: string;
    credit: number;
    debit: number;
    total: number;
};

type AccountSummary = {
    id: number;
    name: string;
    bank_name: string;
    account_number: string | null;
    credit: number;
    debit: number;
    income?: number;
    expenses?: number;
    transfers_in?: number;
    transfers_out?: number;
    balance: number;
};

type Props = {
    pendingInvitations?: DashboardInvitation[];
    summary: CategorySummary[];
    bankAccounts?: BankAccount[];
    accountSummaries?: AccountSummary[];
    selectedBankAccountId?: number | null;
    selectedMonth: string;
    startDate: string;
    endDate: string;
};

export default function Dashboard({
    pendingInvitations = [],
    summary = [],
    bankAccounts = [],
    accountSummaries = [],
    selectedBankAccountId = null,
    selectedMonth,
    startDate,
    endDate,
}: Props) {
    const page = usePage();
    const currentTeam = page.props.currentTeam as Team;

    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );

    const [fromDate, setFromDate] = useState(startDate);
    const [toDate, setToDate] = useState(endDate);
    const [bankAccountId, setBankAccountId] = useState<string>(
        selectedBankAccountId ? String(selectedBankAccountId) : '',
    );

    useEffect(() => {
        setFromDate(startDate);
        setToDate(endDate);
        setBankAccountId(selectedBankAccountId ? String(selectedBankAccountId) : '');
    }, [startDate, endDate, selectedBankAccountId]);

    const getCategoryTransactionsUrl = (categoryId: number | null) => {
        const url = new URL(transactionsIndex(currentTeam.slug).url, window.location.origin);
        if (categoryId === null) {
            url.searchParams.set('category_id', 'uncategorized');
        } else {
            url.searchParams.set('category_id', String(categoryId));
        }
        if (bankAccountId) {
            url.searchParams.set('bank_account_id', bankAccountId);
        }
        if (fromDate) {
            url.searchParams.set('from_date', fromDate);
        }
        if (toDate) {
            url.searchParams.set('to_date', toDate);
        }
        return url.pathname + url.search;
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const month = e.target.value;
        const params: Record<string, string> = { month };
        if (bankAccountId) params.bank_account_id = bankAccountId;
        router.get(
            dashboard(currentTeam.slug).url,
            params,
            { preserveState: true },
        );
    };

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFromDate(value);
        if (value && toDate && value <= toDate) {
            const params: Record<string, string> = { from_date: value, to_date: toDate };
            if (bankAccountId) params.bank_account_id = bankAccountId;
            router.get(
                dashboard(currentTeam.slug).url,
                params,
                { preserveState: true },
            );
        }
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setToDate(value);
        if (fromDate && value && fromDate <= value) {
            const params: Record<string, string> = { from_date: fromDate, to_date: value };
            if (bankAccountId) params.bank_account_id = bankAccountId;
            router.get(
                dashboard(currentTeam.slug).url,
                params,
                { preserveState: true },
            );
        }
    };

    const handleBankAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setBankAccountId(value);
        const params: Record<string, string> = {};
        if (value) params.bank_account_id = value;
        if (selectedMonth) params.month = selectedMonth;
        else if (fromDate && toDate) {
            params.from_date = fromDate;
            params.to_date = toDate;
        }
        router.get(
            dashboard(currentTeam.slug).url,
            params,
            { preserveState: true },
        );
    };

    // Calculate Column Totals
    const totalCredit = summary.reduce((sum, item) => sum + item.credit, 0);
    const totalDebit = summary.reduce((sum, item) => sum + item.debit, 0);
    const grandTotal = totalCredit - totalDebit;

    // Currency Formatter (INR to match Transactions list currency format)
    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    const selectedAccountName = bankAccountId
        ? bankAccounts.find((b) => String(b.id) === bankAccountId)?.name
        : 'All Bank Accounts';

    return (
        <>
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />

            <div className="flex flex-col space-y-6 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <Heading
                        title="Dashboard & Reports"
                        description={`Financial overview for ${selectedAccountName}.`}
                    />

                    {/* Filters */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="bank-account-select"
                                className="text-sm font-medium whitespace-nowrap text-muted-foreground"
                            >
                                Bank:
                            </label>
                            <select
                                id="bank-account-select"
                                value={bankAccountId}
                                onChange={handleBankAccountChange}
                                className="flex h-9 w-48 rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm font-medium text-foreground shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden dark:border-neutral-800 dark:bg-neutral-900"
                            >
                                <option value="">All Bank Accounts</option>
                                {bankAccounts.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name} ({b.bank_name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="month-select"
                                className="text-sm font-medium whitespace-nowrap text-muted-foreground"
                            >
                                Month:
                            </label>
                            <input
                                type="month"
                                id="month-select"
                                value={selectedMonth || ''}
                                onChange={handleMonthChange}
                                className="flex h-9 w-40 rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden dark:border-neutral-800 dark:bg-neutral-900"
                            />
                        </div>

                        <span className="hidden text-xs text-muted-foreground sm:inline">or</span>

                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="from-date"
                                className="text-sm font-medium whitespace-nowrap text-muted-foreground"
                            >
                                From:
                            </label>
                            <input
                                type="date"
                                id="from-date"
                                value={fromDate}
                                onChange={handleFromDateChange}
                                className="flex h-9 w-36 rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden dark:border-neutral-800 dark:bg-neutral-900"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="to-date"
                                className="text-sm font-medium whitespace-nowrap text-muted-foreground"
                            >
                                To:
                            </label>
                            <input
                                type="date"
                                id="to-date"
                                value={toDate}
                                onChange={handleToDateChange}
                                className="flex h-9 w-36 rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden dark:border-neutral-800 dark:bg-neutral-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Bank Account Breakdown Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {accountSummaries.map((acc) => {
                        const isSelected = String(acc.id) === bankAccountId;
                        return (
                            <div
                                key={acc.id}
                                onClick={() => {
                                    const nextId = isSelected ? '' : String(acc.id);
                                    setBankAccountId(nextId);
                                    const params: Record<string, string> = {};
                                    if (nextId) params.bank_account_id = nextId;
                                    if (selectedMonth) params.month = selectedMonth;
                                    else if (fromDate && toDate) {
                                        params.from_date = fromDate;
                                        params.to_date = toDate;
                                    }
                                    router.get(dashboard(currentTeam.slug).url, params, { preserveState: true });
                                }}
                                className={`cursor-pointer rounded-xl border p-4 transition-all shadow-xs ${
                                    isSelected
                                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20 dark:bg-primary/10'
                                        : 'border-sidebar-border/70 bg-card hover:bg-muted/30 dark:border-sidebar-border'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                            <Landmark className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-foreground">{acc.name}</h4>
                                            <p className="text-xs text-muted-foreground">{acc.bank_name} {acc.account_number ? `(${acc.account_number})` : ''}</p>
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">Active Filter</span>
                                    )}
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-xs">
                                    <div>
                                        <span className="text-muted-foreground block text-[11px]">Total Inflow</span>
                                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatAmount(acc.credit)}</span>
                                        {acc.transfers_in ? (
                                            <span className="text-[10px] text-muted-foreground block">+ {formatAmount(acc.transfers_in)} txfer</span>
                                        ) : null}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block text-[11px]">Total Outflow</span>
                                        <span className="font-semibold text-rose-600 dark:text-rose-400">{formatAmount(acc.debit)}</span>
                                        {acc.transfers_out ? (
                                            <span className="text-[10px] text-amber-600 dark:text-amber-400 block">- {formatAmount(acc.transfers_out)} txfer</span>
                                        ) : null}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-muted-foreground block text-[11px]">Net Balance</span>
                                        <span className={`font-bold ${acc.balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                            {acc.balance > 0 ? '+' : ''}{formatAmount(acc.balance)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Category Summary Card */}
                <div className="grid grid-cols-12 gap-4">
                    <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card text-card-foreground dark:border-sidebar-border col-span-12">
                        <div className="border-b border-sidebar-border/70 bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                                <h3 className="text-base font-semibold">
                                    Category Summary ({selectedAccountName})
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Detailed breakdown of credits and debits grouped by category.
                                </p>
                            </div>
                            {bankAccountId && (
                                <button
                                    onClick={() => {
                                        setBankAccountId('');
                                        const params: Record<string, string> = {};
                                        if (selectedMonth) params.month = selectedMonth;
                                        else if (fromDate && toDate) {
                                            params.from_date = fromDate;
                                            params.to_date = toDate;
                                        }
                                        router.get(dashboard(currentTeam.slug).url, params, { preserveState: true });
                                    }}
                                    className="text-xs text-primary underline font-medium self-start sm:self-auto"
                                >
                                    Show All Bank Accounts Combined
                                </button>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/30 font-medium text-muted-foreground">
                                        <th className="p-4">Category Name</th>
                                        <th className="p-4">Credit</th>
                                        <th className="p-4">Debit</th>
                                        <th className="p-4 text-right">
                                            Row Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {summary.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            className="transition-colors hover:bg-muted/10"
                                        >
                                            <td className="p-4 font-medium">
                                                <Link
                                                    href={getCategoryTransactionsUrl(item.id)}
                                                    className="text-primary hover:underline"
                                                >
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td className="p-4">
                                                {item.credit > 0 ? (
                                                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                                        {formatAmount(item.credit)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {item.debit > 0 ? (
                                                    <span className="font-medium text-rose-600 dark:text-rose-400">
                                                        {formatAmount(item.debit)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right font-semibold">
                                                <span
                                                    className={
                                                        item.total >= 0
                                                            ? 'text-emerald-600 dark:text-emerald-400'
                                                            : 'text-rose-600 dark:text-rose-400'
                                                    }
                                                >
                                                    {item.total > 0 ? '+' : ''}
                                                    {formatAmount(item.total)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {summary.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="p-8 text-center text-muted-foreground"
                                            >
                                                No transaction data recorded for this period.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {summary.length > 0 && (
                                    <tfoot>
                                        <tr className="border-t bg-muted/30 font-semibold text-foreground">
                                            <td className="p-4">Total</td>
                                            <td className="p-4 text-emerald-600 dark:text-emerald-400">
                                                {formatAmount(totalCredit)}
                                            </td>
                                            <td className="p-4 text-rose-600 dark:text-rose-400">
                                                {formatAmount(totalDebit)}
                                            </td>
                                            <td className="p-4 text-right">
                                                <span
                                                    className={
                                                        grandTotal >= 0
                                                            ? 'font-bold text-emerald-600 dark:text-emerald-400'
                                                            : 'font-bold text-rose-600 dark:text-rose-400'
                                                    }
                                                >
                                                    {grandTotal > 0 ? '+' : ''}
                                                    {formatAmount(grandTotal)}
                                                </span>
                                            </td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: Team | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
