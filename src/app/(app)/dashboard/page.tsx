import { DashboardStats } from '@/app/components/dashboard-stats';
import { FinancialTips } from '@/app/components/financial-tips';
import { RecentTransactions } from '@/app/components/recent-transactions';
import { SpendingChart } from '@/app/components/spending-chart';
import { getTransactions } from '@/app/lib/data';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Skeleton className="h-[126px]" />
      <Skeleton className="h-[126px]" />
      <Skeleton className="h-[126px]" />
    </div>
  );
}

function RecentTransactionsSkeleton() {
  return <Skeleton className="h-[460px]" />;
}

export default async function DashboardPage() {
  const transactions = await getTransactions();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <Suspense fallback={<StatsSkeleton />}>
          <DashboardStats />
        </Suspense>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <Suspense fallback={<RecentTransactionsSkeleton />}>
              <RecentTransactions />
            </Suspense>
          </div>
          <div className="col-span-4 lg:col-span-3 space-y-4">
             <SpendingChart transactions={transactions} />
             <FinancialTips />
          </div>
        </div>
      </div>
    </div>
  );
}
