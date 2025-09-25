
'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing plant growth from an image.
 *
 * - analyzePlantGrowth - A function that analyzes a plant image and returns growth metrics.
 * - AnalyzePlantGrowthInput - The input type for analyzePlantGrowth.
 * - AnalyzePlantGrowthOutput - The output type for analyzePlantGrowth.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePlantGrowthInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePlantGrowthInput = z.infer<
  typeof AnalyzePlantGrowthInputSchema
>;

const AnalyzePlantGrowthOutputSchema = z.object({
  plantType: z.string().describe('The identified type or species of the plant.'),
  growthStage: z
    .enum(['seedling', 'vegetative', 'flowering', 'harvest-ready'])
    .describe('The current growth stage of the plant.'),
  growthProgress: z
    .number()
    .min(0)
    .max(100)
    .describe('The estimated growth progress percentage.'),
  healthScore: z
    .number()
    .min(0)
    .max(100)
    .describe('The calculated health score of the plant, from 0 to 100.'),
});
export type AnalyzePlantGrowthOutput = z_infer<
  typeof AnalyzePlantGrowthOutputSchema
>;

export async function analyzePlantGrowth(
  input: AnalyzePlantGrowthInput
): Promise<AnalyzePlantGrowthOutput> {
  return analyzePlantGrowthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePlantGrowthPrompt',
  input: {schema: AnalyzePlantGrowthInputSchema},
  output: {schema: AnalyzePlantGrowthOutputSchema},
  prompt: `You are a plant growth analysis expert. Analyze the provided image of a plant and return its details.

  Based on the image, determine the plant's species, its current growth stage (such as seedling, vegetative, flowering, or harvest-ready), estimate its growth progress as a percentage, and provide a health score from 0 to 100.

  Photo: {{media url=photoDataUri}}`,
});

const analyzePlantGrowthFlow = ai.defineFlow(
  {
    name: 'analyzePlantGrowthFlow',
    inputSchema: AnalyzePlantGrowthInputSchema,
    outputSchema: AnalyzePlantGrowthOutputSchema,
  },
  async input => {
    // In a real implementation, you might call an external API here.
    // For now, we'll use a generative model to simulate the analysis.
    const {output} = await prompt(input);
    return output!;
  }
);
