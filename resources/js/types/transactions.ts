import type { Category } from './categories';

export type Transaction = {
    id: number;
    team_id: number;
    category_id: number | null;
    date: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string | null;
    created_at: string;
    updated_at: string;
    category?: Category | null;
};
