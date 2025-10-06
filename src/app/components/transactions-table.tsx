import { getTransactions } from '@/app/lib/data';
import { getCategoryInfo } from '@/app/lib/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export async function TransactionsTable() {
  const transactions = await getTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const categoryInfo = getCategoryInfo(transaction.category);
            return (
              <TableRow key={transaction.id}>
                <TableCell className="text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.description}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center gap-2 w-fit">
                    {categoryInfo && <categoryInfo.icon className="h-3 w-3" />}
                    {categoryInfo?.label || transaction.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.type === 'income' ? 'default' : 'secondary'
                    }
                    className={
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                    }
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  } dark:text-${transaction.type === 'income' ? 'green' : 'red'}-400`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
