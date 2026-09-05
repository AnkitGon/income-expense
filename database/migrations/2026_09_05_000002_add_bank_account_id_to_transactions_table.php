<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->foreignId('bank_account_id')->nullable()->after('category_id')->constrained()->cascadeOnDelete();
        });

        // Ensure any existing transactions have a bank account assigned
        $transactionsWithoutAccount = DB::table('transactions')->whereNull('bank_account_id')->get();
        if ($transactionsWithoutAccount->isNotEmpty()) {
            $teamIds = $transactionsWithoutAccount->pluck('team_id')->unique();
            foreach ($teamIds as $teamId) {
                $bankAccountId = DB::table('bank_accounts')->insertGetId([
                    'team_id' => $teamId,
                    'name' => 'Default Bank Account',
                    'bank_name' => 'General Bank',
                    'account_number' => '0000',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('transactions')
                    ->where('team_id', $teamId)
                    ->whereNull('bank_account_id')
                    ->update(['bank_account_id' => $bankAccountId]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['bank_account_id']);
            $table->dropColumn('bank_account_id');
        });
    }
};
