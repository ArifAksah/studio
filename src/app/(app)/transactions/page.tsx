import { TransactionsTable } from '@/app/components/transactions-table';
import { AddTransactionSheet } from '@/app/components/add-transaction-sheet';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function TableSkeleton() {
    return <Skeleton className="h-[600px] w-full" />
}

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <AddTransactionSheet />
      </div>
      <p className="text-muted-foreground">
        A detailed history of all your income and expenses.
      </p>
      <div className="space-y-4">
        <Suspense fallback={<TableSkeleton />}>
            <TransactionsTable />
        </Suspense>
      </div>
    </div>
  );
}
