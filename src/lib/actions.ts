
'use server';
// All server actions are disabled for the static demo.
// In a real application, these functions would interact with Firestore.

import { z } from 'zod';

// Mock state types
export type ProductState = {
  errors?: any;
  message?: string | null;
};
export type BlogPostState = {
    errors?: any;
    message?: string | null;
};

// Mock createProduct function
export async function createProduct(prevState: ProductState, formData: FormData): Promise<ProductState> {
  console.log('Attempted to create product (demo mode):', Object.fromEntries(formData.entries()));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { message: `(Demo) Product created successfully.` };
}

// Mock createBlogPost function
export async function createBlogPost(prevState: BlogPostState, formData: FormData): Promise<BlogPostState> {
    console.log('Attempted to create blog post (demo mode):', Object.fromEntries(formData.entries()));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: `(Demo) Blog post created successfully.` };
}
