export type BankAccount = {
    id: number;
    team_id: number;
    name: string;
    bank_name: string;
    account_number: string | null;
    description: string | null;
    created_at: string;
    updated_at: string;
    transactions_count?: number;
};
