import type { BankAccount } from './bank-accounts';
import type { Category } from './categories';

export type Transaction = {
    id: number;
    team_id: number;
    category_id: number | null;
    bank_account_id: number;
    transfer_pair_id?: number | null;
    date: string;
    type: 'credit' | 'debit' | 'transfer';
    amount: number;
    description: string | null;
    created_at: string;
    updated_at: string;
    category?: Category | null;
    bank_account?: BankAccount | null;
    bankAccount?: BankAccount | null;
};
