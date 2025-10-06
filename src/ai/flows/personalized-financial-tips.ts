'use server';

/**
 * @fileOverview Generates personalized financial tips based on user's expense data.
 *
 * - getPersonalizedFinancialTips - A function that generates personalized financial tips.
 * - FinancialTipsInput - The input type for the getPersonalizedFinancialTips function.
 * - FinancialTipsOutput - The return type for the getPersonalizedFinancialTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialTipsInputSchema = z.object({
  expenseData: z
    .string()
    .describe(
      'A string containing the user\'s expense data, including categories, amounts, and dates.'
    ),
});
export type FinancialTipsInput = z.infer<typeof FinancialTipsInputSchema>;

const FinancialTipsOutputSchema = z.object({
  tips: z
    .string()
    .describe('Personalized financial tips based on the user\'s expense data.'),
});
export type FinancialTipsOutput = z.infer<typeof FinancialTipsOutputSchema>;

export async function getPersonalizedFinancialTips(
  input: FinancialTipsInput
): Promise<FinancialTipsOutput> {
  return personalizedFinancialTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFinancialTipsPrompt',
  input: {schema: FinancialTipsInputSchema},
  output: {schema: FinancialTipsOutputSchema},
  prompt: `You are a financial advisor providing personalized tips based on user expense data.

  Analyze the following expense data and provide actionable tips to save money and improve financial habits.

  Expense Data:
  {{expenseData}}

  Tips:`,
});

const personalizedFinancialTipsFlow = ai.defineFlow(
  {
    name: 'personalizedFinancialTipsFlow',
    inputSchema: FinancialTipsInputSchema,
    outputSchema: FinancialTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
