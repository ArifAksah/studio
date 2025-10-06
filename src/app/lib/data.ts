import type { Transaction, Budget } from '@/app/lib/types';
import { subMonths, format } from 'date-fns';

const today = new Date();

const mockTransactions: Omit<Transaction, 'id'>[] = [
  // Last Month
  { date: format(subMonths(today, 1), 'yyyy-MM-dd'), description: "Monthly Salary", amount: 5000, type: 'income', category: 'salary' },
  { date: format(subMonths(today, 1), 'yyyy-MM-dd'), description: "Groceries from Walmart", amount: 150.75, type: 'expense', category: 'groceries' },
  { date: format(subMonths(today, 1), 'yyyy-MM-dd'), description: "Dinner with friends", amount: 80.50, type: 'expense', category: 'food' },
  { date: format(subMonths(today, 1), 'yyyy-MM-dd'), description: "Rent Payment", amount: 1200, type: 'expense', category: 'housing' },
  { date: format(subMonths(today, 1), 'yyyy-MM-dd'), description: "Gas fill-up", amount: 45.30, type: 'expense', category: 'transportation' },

  // Current Month
  { date: format(today, 'yyyy-MM-dd'), description: "Monthly Salary", amount: 5000, type: 'income', category: 'salary' },
  { date: format(new Date(today.setDate(2)), 'yyyy-MM-dd'), description: "Costco Haul", amount: 220.40, type: 'expense', category: 'groceries' },
  { date: format(new Date(today.setDate(3)), 'yyyy-MM-dd'), description: "Electricity Bill", amount: 75.00, type: 'expense', category: 'housing' },
  { date: format(new Date(today.setDate(5)), 'yyyy-MM-dd'), description: "Lunch at office", amount: 15.20, type: 'expense', category: 'food' },
  { date: format(new Date(today.setDate(7)), 'yyyy-MM-dd'), description: "Movie tickets", amount: 30.00, type: 'expense', category: 'entertainment' },
  { date: format(new Date(today.setDate(10)), 'yyyy-MM-dd'), description: "New book", amount: 25.00, type: 'expense', category: 'education' },
  { date: format(new Date(today.setDate(12)), 'yyyy-MM-dd'), description: "Pharmacy", amount: 40.00, type: 'expense', category: 'health' },
  { date: format(new Date(today.setDate(15)), 'yyyy-MM-dd'), description: "Uber ride", amount: 22.80, type: 'expense', category: 'transportation' },
  { date: format(new Date(today.setDate(18)), 'yyyy-MM-dd'), description: "Weekly groceries", amount: 95.60, type: 'expense', category: 'groceries' },
  { date: format(new Date(today.setDate(20)), 'yyyy-MM-dd'), description: "Coffee with colleague", amount: 8.50, type: 'expense', category: 'food' },
  { date: format(new Date(today.setDate(22)), 'yyyy-MM-dd'), description: "Birthday gift for Mom", amount: 50.00, type: 'expense', category: 'gifts' },
];

const mockBudgets: Omit<Budget, 'id' | 'spent' | 'remaining' | 'progress'>[] = [
    { category: 'food', amount: 400 },
    { category: 'groceries', amount: 500 },
    { category: 'transportation', amount: 150 },
    { category: 'entertainment', amount: 100 },
];

// Add unique IDs to transactions
export const transactions: Transaction[] = mockTransactions.map((t, i) => ({
  ...t,
  id: `trans-${i + 1}`,
})).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


export async function getTransactions(): Promise<Transaction[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return transactions;
}

export async function getBudgets(): Promise<Budget[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const currentMonthTransactions = transactions.filter(t => 
    t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth()
  );

  const budgets: Budget[] = mockBudgets.map((b, i) => {
    const spent = currentMonthTransactions
      .filter(t => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const remaining = b.amount - spent;
    const progress = Math.min((spent / b.amount) * 100, 100);

    return {
      ...b,
      id: `budget-${i + 1}`,
      spent,
      remaining,
      progress,
    };
  });

  return budgets;
}
