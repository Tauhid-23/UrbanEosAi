'use server';

/**
 * @fileOverview This file defines a Genkit flow for handling a new contact message.
 *
 * This is a placeholder for a flow that would typically send an email notification
 * to an administrator when a new contact message is submitted.
 *
 * - handleContactMessage - A function to process the contact message.
 * - ContactMessageInput - The input type for the flow.
 * - ContactMessageOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContactMessageInputSchema = z.object({
  name: z.string().describe("The sender's name."),
  email: z.string().email().describe("The sender's email address."),
  message: z.string().describe('The content of the message.'),
});
export type ContactMessageInput = z.infer<typeof ContactMessageInputSchema>;

const ContactMessageOutputSchema = z.object({
  status: z.enum(['received', 'failed']),
  message: z.string().describe('A confirmation message.'),
});
export type ContactMessageOutput = z.infer<typeof ContactMessageOutputSchema>;

export async function handleContactMessage(
  input: ContactMessageInput
): Promise<ContactMessageOutput> {
  return handleContactMessageFlow(input);
}

const handleContactMessageFlow = ai.defineFlow(
  {
    name: 'handleContactMessageFlow',
    inputSchema: ContactMessageInputSchema,
    outputSchema: ContactMessageOutputSchema,
  },
  async input => {
    // In a real implementation, you would use a service like Resend or Nodemailer
    // to send an email to the site admin.
    console.log(`New contact message from ${input.name} (${input.email}):`);
    console.log(input.message);

    // This is a placeholder response.
    return {
      status: 'received',
      message: 'Your message has been received and an admin will be notified.',
    };
  }
);
