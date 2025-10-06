'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateFinancialTips } from '@/app/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  tips: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" />
          Generate Tips
        </>
      )}
    </Button>
  );
}

export function FinancialTips() {
  const [state, formAction] = useFormState(generateFinancialTips, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Financial Advisor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Get personalized tips to improve your financial habits based on your
          spending.
        </p>

        <form action={formAction}>
          <SubmitButton />
        </form>

        {state.error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.tips && (
          <div className="prose prose-sm dark:prose-invert max-w-none rounded-lg border bg-muted p-4">
            <p className="whitespace-pre-wrap font-sans">{state.tips}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
