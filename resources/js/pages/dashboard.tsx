import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import Heading from '@/components/heading';
import { dashboard } from '@/routes';
import { index as transactionsIndex } from '@/routes/transactions';
import type { DashboardInvitation, Team } from '@/types';

type CategorySummary = {
    id: number | null;
    name: string;
    credit: number;
    debit: number;
    total: number;
};

type Props = {
    pendingInvitations?: DashboardInvitation[];
    summary: CategorySummary[];
    selectedMonth: string;
    startDate: string;
    endDate: string;
};

export default function Dashboard({
    pendingInvitations = [],
    summary = [],
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

    useEffect(() => {
        setFromDate(startDate);
        setToDate(endDate);
    }, [startDate, endDate]);

    const getCategoryTransactionsUrl = (categoryId: number | null) => {
        const url = new URL(transactionsIndex(currentTeam.slug).url, window.location.origin);
        if (categoryId === null) {
            url.searchParams.set('category_id', 'uncategorized');
        } else {
            url.searchParams.set('category_id', String(categoryId));
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
        router.get(
            dashboard(currentTeam.slug).url,
            { month },
            { preserveState: true },
        );
    };

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFromDate(value);
        if (value && toDate && value <= toDate) {
            router.get(
                dashboard(currentTeam.slug).url,
                { from_date: value, to_date: toDate },
                { preserveState: true },
            );
        }
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setToDate(value);
        if (fromDate && value && fromDate <= value) {
            router.get(
                dashboard(currentTeam.slug).url,
                { from_date: fromDate, to_date: value },
                { preserveState: true },
            );
        }
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

    return (
        <>
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />

            <div className="flex flex-col space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Dashboard"
                        description="Overview of your team's income and expenses."
                    />

                    {/* Date Filters */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                                className="flex h-9 w-44 rounded-md border border-input border-neutral-200 bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden dark:border-neutral-800 dark:bg-neutral-900"
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

                {/* Category Summary Card */}
                <div className="grid grid-cols-12 gap-4">
                    <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card text-card-foreground dark:border-sidebar-border col-span-12 lg:col-span-6">
                        <div className="border-b border-sidebar-border/70 bg-muted/20 p-4">
                            <h3 className="text-base font-semibold">
                                Category Summary
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Detailed summary of credits and debits by category.
                            </p>
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
                                                No transaction data recorded for
                                                this month.
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
