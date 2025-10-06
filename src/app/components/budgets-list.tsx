import { getBudgets } from '@/app/lib/data';
import { getCategoryInfo } from '@/app/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export async function BudgetsList() {
  const budgets = await getBudgets();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => {
        const categoryInfo = getCategoryInfo(budget.category);
        return (
          <Card key={budget.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                {categoryInfo && <categoryInfo.icon className="h-5 w-5 text-muted-foreground" />}
                <CardTitle className="text-lg">{categoryInfo?.label}</CardTitle>
              </div>
              <div className="text-lg font-bold">{formatCurrency(budget.amount)}</div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                {formatCurrency(budget.spent)} spent of {formatCurrency(budget.amount)}
              </div>
              <Progress value={budget.progress} />
              <div className="text-xs text-muted-foreground mt-2">
                {formatCurrency(budget.remaining)} remaining
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
