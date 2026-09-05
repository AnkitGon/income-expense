export type Goal = {
    id: number;
    team_id: number;
    name: string;
    description: string | null;
    status: 'pending' | 'achieved';
    achieved_at: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
};
