'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getPlantRecommendations, State } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState: State = { message: null, errors: {} };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function RecommendationTool() {
  const [state, dispatch] = useFormState(getPlantRecommendations, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
        });
    }
  }, [state.message, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">AI Recommendation Tool</CardTitle>
          <CardDescription>
            Fill out the details below to get personalized plant suggestions from
            our AI.
          </CardDescription>
        </CardHeader>
        <form action={dispatch}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Your Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Brooklyn, NY"
                required
              />
              {state.errors?.location && (
                <p className="text-sm text-destructive">{state.errors.location[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="space">Available Space</Label>
              <Input
                id="space"
                name="space"
                placeholder="e.g., Sunny balcony, indoor windowsill"
                required
              />
              {state.errors?.space && (
                 <p className="text-sm text-destructive">{state.errors.space[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Gardening Experience</Label>
              <Select name="experienceLevel" required>
                <SelectTrigger id="experienceLevel">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
               {state.errors?.experienceLevel && (
                 <p className="text-sm text-destructive">{state.errors.experienceLevel[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.data && (
        <Alert className="bg-primary/5 border-primary/20">
            <Sparkles className="h-4 w-4 !text-primary" />
            <AlertTitle className="font-headline text-primary">AI Suggestions</AlertTitle>
            <AlertDescription>
            <p className="font-semibold mt-4 mb-2">Recommended Plants:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              {state.data.suggestedPlants.map((plant) => (
                <li key={plant}>{plant}</li>
              ))}
            </ul>
            <p className="font-semibold mb-2">Reasoning:</p>
            <p>{state.data.reason}</p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
