'use client';

import type { Transaction } from '@/app/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
];


export function SpendingChart({ transactions }: { transactions: Transaction[] }) {
  const { chartData, chartConfig } = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const spendingByCategory: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      if (!spendingByCategory[expense.category]) {
        spendingByCategory[expense.category] = 0;
      }
      spendingByCategory[expense.category] += expense.amount;
    });

    const data = Object.entries(spendingByCategory)
      .map(([category, total]) => ({
        category,
        total,
        label: `${category.charAt(0).toUpperCase() + category.slice(1)}: $${total.toFixed(2)}`,
      }))
      .sort((a, b) => b.total - a.total);
    
    const config: ChartConfig = {};
    data.forEach((item, index) => {
      config[item.category] = {
        label: item.category.charAt(0).toUpperCase() + item.category.slice(1),
        color: CHART_COLORS[index % CHART_COLORS.length],
      }
    });

    return { chartData: data, chartConfig: config };
  }, [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>A breakdown of your expenses for this period.</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartConfig[entry.category]?.color}
                  />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No expense data to display.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
