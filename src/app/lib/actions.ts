'use server';

import { getPersonalizedFinancialTips } from '@/ai/flows/personalized-financial-tips';
import { getTransactions } from './data';

export async function generateFinancialTips() {
  try {
    const transactions = await getTransactions();
    const expenseDataString = transactions
      .map(
        (t) =>
          `${t.date}: ${t.description} - [${t.category}] ${
            t.type === 'expense' ? '-' : '+'
          }$${t.amount.toFixed(2)}`
      )
      .join('\n');

    const result = await getPersonalizedFinancialTips({
      expenseData: expenseDataString,
    });

    return { tips: result.tips, error: null };
  } catch (error) {
    console.error('Error generating financial tips:', error);
    return {
      tips: null,
      error: 'Failed to generate financial tips. Please try again later.',
    };
  }
}
