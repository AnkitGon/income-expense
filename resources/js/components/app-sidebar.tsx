import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    DollarSign,
    FolderGit2,
    Landmark,
    LayoutGrid,
    Tags,
    Target,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as bankAccountsIndex } from '@/routes/bank-accounts';
import { index as categoriesIndex } from '@/routes/categories';
import { index as goalsIndex } from '@/routes/goals';
import { index as transactionsIndex } from '@/routes/transactions';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const dashboardUrl = page.props.currentTeam
        ? dashboard(page.props.currentTeam.slug)
        : '/';

    const bankAccountsUrl = page.props.currentTeam
        ? bankAccountsIndex(page.props.currentTeam.slug)
        : '#';

    const categoriesUrl = page.props.currentTeam
        ? categoriesIndex(page.props.currentTeam.slug)
        : '#';

    const goalsUrl = page.props.currentTeam
        ? goalsIndex(page.props.currentTeam.slug)
        : '#';

    const transactionsUrl = page.props.currentTeam
        ? transactionsIndex(page.props.currentTeam.slug)
        : '#';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: LayoutGrid,
        },
        {
            title: 'Goals',
            href: goalsUrl,
            icon: Target,
        },
        {
            title: 'Bank Accounts',
            href: bankAccountsUrl,
            icon: Landmark,
        },
        {
            title: 'Categories',
            href: categoriesUrl,
            icon: Tags,
        },
        {
            title: 'Transactions',
            href: transactionsUrl,
            icon: DollarSign,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <TeamSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
