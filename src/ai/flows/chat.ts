'use server';

/**
 * @fileOverview A Genkit flow for handling chatbot conversations.
 *
 * - chat - A function that takes conversation history and returns an AI response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The output type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ChatInputSchema = z.object({
  history: z.array(z.object({role: z.enum(['user', 'model']), content: z.string()})),
  prompt: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
    return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({history, prompt}) => {
    const chat = ai.startChat({
        history,
        system: `You are a helpful and friendly AI assistant for UrbanEos AI, an urban gardening application.
        Your goal is to assist users with their gardening questions, help them navigate the app,
        and recommend products from the marketplace. Be concise and encouraging.
        
        Available pages: Home, Dashboard, Blog, Marketplace, Resources, Contact.
        Key features: AI Plant Recommendations, Disease Detection, Organic Marketplace.
        `,
    });

    const response = await chat.send(prompt);
    return { response: response.text };
  }
);
