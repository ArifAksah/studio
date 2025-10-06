import { BudgetsList } from '@/app/components/budgets-list';
import { AddBudgetDialog } from '@/app/components/add-budget-dialog';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function BudgetsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[158px]" />
            <Skeleton className="h-[158px]" />
            <Skeleton className="h-[158px]" />
            <Skeleton className="h-[158px]" />
        </div>
    )
}

export default function BudgetsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
        <AddBudgetDialog />
      </div>
      <p className="text-muted-foreground">
        Track your monthly spending against your set budgets.
      </p>
      <div className="space-y-4">
        <Suspense fallback={<BudgetsSkeleton />}>
            <BudgetsList />
        </Suspense>
      </div>
    </div>
  );
}
