import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-suitable-plants.ts';
import '@/ai/flows/summarize-blog-post.ts';
import '@/ai/flows/analyze-plant-growth.ts';
import '@/ai/flows/handle-contact-message.ts';
import '@/ai/flows/trigger-disease-scan.ts';
