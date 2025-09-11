'use server';

import {
  suggestSuitablePlants,
  SuggestSuitablePlantsInput,
  SuggestSuitablePlantsOutput,
} from '@/ai/flows/suggest-suitable-plants';
import { z } from 'zod';

const FormSchema = z.object({
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters.' }),
  space: z
    .string()
    .min(2, { message: 'Space description must be at least 2 characters.' }),
  experienceLevel: z.string({
    required_error: 'Please select an experience level.',
  }),
});

export type State = {
  errors?: {
    location?: string[];
    space?: string[];
    experienceLevel?: string[];
  };
  message?: string | null;
  data?: SuggestSuitablePlantsOutput | null;
};

export async function getPlantRecommendations(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    location: formData.get('location'),
    space: formData.get('space'),
    experienceLevel: formData.get('experienceLevel'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to get recommendations.',
    };
  }

  try {
    const result = await suggestSuitablePlants(
      validatedFields.data as SuggestSuitablePlantsInput
    );
    return { data: result, message: null, errors: {} };
  } catch (e) {
    console.error(e);
    return {
      message: 'An error occurred with the AI service. Please try again later.',
      data: null,
      errors: {},
    };
  }
}
