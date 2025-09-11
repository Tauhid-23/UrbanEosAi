'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting suitable plants based on user criteria.
 *
 * The flow takes into account the user's location, available space, and gardening experience level
 * to provide personalized plant recommendations.
 *
 * @fileOverview
 * - suggestSuitablePlants - A function that suggests plants for the user.
 * - SuggestSuitablePlantsInput - The input type for suggestSuitablePlants.
 * - SuggestSuitablePlantsOutput - The output type for suggestSuitablePlants.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSuitablePlantsInputSchema = z.object({
  location: z
    .string()
    .describe(
      'The geographical location of the user, which helps determine suitable plant species.'
    ),
  space: z
    .string()
    .describe(
      'The available space for gardening (e.g., balcony, small garden, large garden).' + 
      'This helps in recommending plants that fit the space.'
    ),
  experienceLevel: z
    .string()
    .describe(
      'The gardening experience level of the user (e.g., beginner, intermediate, advanced).' + 
      'This helps in suggesting plants that match the user skill level.'
    ),
});
export type SuggestSuitablePlantsInput = z.infer<
  typeof SuggestSuitablePlantsInputSchema
>;

const SuggestSuitablePlantsOutputSchema = z.object({
  suggestedPlants: z
    .array(z.string())
    .describe(
      'An array of plant names that are suitable for the given location, space, and experience level.'
    ),
  reason: z
    .string()
    .describe(
      'A brief explanation of why these plants are recommended, considering the input criteria.'
    ),
});
export type SuggestSuitablePlantsOutput = z.infer<
  typeof SuggestSuitablePlantsOutputSchema
>;

export async function suggestSuitablePlants(
  input: SuggestSuitablePlantsInput
): Promise<SuggestSuitablePlantsOutput> {
  return suggestSuitablePlantsFlow(input);
}

const suggestSuitablePlantsPrompt = ai.definePrompt({
  name: 'suggestSuitablePlantsPrompt',
  input: {schema: SuggestSuitablePlantsInputSchema},
  output: {schema: SuggestSuitablePlantsOutputSchema},
  prompt: `You are a gardening expert. A user is asking for plant suggestions based on their location, available space, and gardening experience.

  Location: {{{location}}}
  Available Space: {{{space}}}
  Experience Level: {{{experienceLevel}}}

  Based on these factors, suggest a few suitable plants and briefly explain why they are appropriate for the user:

  Plants:`, // Handlebars syntax is correct here.
});

const suggestSuitablePlantsFlow = ai.defineFlow(
  {
    name: 'suggestSuitablePlantsFlow',
    inputSchema: SuggestSuitablePlantsInputSchema,
    outputSchema: SuggestSuitablePlantsOutputSchema,
  },
  async input => {
    const {output} = await suggestSuitablePlantsPrompt(input);
    return output!;
  }
);
