
'use server';

/**
 * @fileOverview A server-side flow to trigger an n8n webhook for disease detection.
 *
 * This flow is designed to be called from the client-side. It takes the image
 * data and then makes a secure, server-to-server request to the n8n webhook,
 * avoiding the CORS issues faced by the client.
 *
 * - triggerDiseaseScan - The function that handles the webhook call.
 * - TriggerDiseaseScanInput - The input type for the flow.
 * - TriggerDiseaseScanOutput - The output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TriggerDiseaseScanInputSchema = z.object({
  imageUrl: z.string().describe('The base64 data URI of the plant image.'),
});
export type TriggerDiseaseScanInput = z.infer<typeof TriggerDiseaseScanInputSchema>;

const TriggerDiseaseScanOutputSchema = z.object({
  status: z.enum(['success', 'failed']),
  message: z.string(),
});
export type TriggerDiseaseScanOutput = z.infer<typeof TriggerDiseaseScanOutputSchema>;

// IMPORTANT: Replace this with your actual deployed n8n webhook URL
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/disease-detect';

export async function triggerDiseaseScan(
  input: TriggerDiseaseScanInput
): Promise<TriggerDiseaseScanOutput> {
  return triggerDiseaseScanFlow(input);
}

const triggerDiseaseScanFlow = ai.defineFlow(
  {
    name: 'triggerDiseaseScanFlow',
    inputSchema: TriggerDiseaseScanInputSchema,
    outputSchema: TriggerDiseaseScanOutputSchema,
  },
  async ({ imageUrl }) => {
    console.log(`Triggering n8n webhook for image.`);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
        }),
      });

      if (!response.ok) {
        // The response body might contain useful error info from n8n
        const errorBody = await response.text();
        throw new Error(
          `Webhook failed with status ${response.status}: ${errorBody}`
        );
      }
      
      const responseData = await response.json();
      console.log('n8n webhook response:', responseData);

      return {
        status: 'success',
        message: 'Successfully triggered n8n disease detection workflow.',
      };
    } catch (error) {
      console.error('Error calling n8n webhook:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      // We are returning a success-shaped object with a failure status
      // because defineFlow expects the return shape to match the outputSchema.
      // The client will then check the 'status' field.
      return {
        status: 'failed',
        message: `Server-side error: Could not trigger n8n webhook. Reason: ${errorMessage}`,
      };
    }
  }
);
