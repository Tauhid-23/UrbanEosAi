
'use server';

import {
  suggestSuitablePlants,
  SuggestSuitablePlantsInput,
  SuggestSuitablePlantsOutput,
} from '@/ai/flows/suggest-suitable-plants';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const PlantFormSchema = z.object({
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

export type PlantRecommendationState = {
  errors?: {
    location?: string[];
    space?: string[];
    experienceLevel?: string[];
  };
  message?: string | null;
  data?: SuggestSuitablePlantsOutput | null;
};

export async function getPlantRecommendations(
  prevState: PlantRecommendationState,
  formData: FormData
): Promise<PlantRecommendationState> {
  const validatedFields = PlantFormSchema.safeParse({
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

const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// Admin Actions
const BlogPostFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  category: z.string().min(2, 'Category must be at least 2 characters.'),
  author: z.string().min(2, 'Author must be at least 2 characters.'),
  imageId: z.string().min(1, 'Image ID is required.'),
});

export type BlogPostState = {
  errors?: {
    title?: string[];
    excerpt?: string[];
    content?: string[];
    category?: string[];
    author?: string[];
    imageId?: string[];
  };
  message?: string | null;
};

export async function createBlogPost(
  prevState: BlogPostState,
  formData: FormData
) {
  const validatedFields = BlogPostFormSchema.safeParse({
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    category: formData.get('category'),
    author: formData.get('author'),
    imageId: formData.get('imageId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to create blog post.',
    };
  }

  try {
    const blogRef = collection(db, 'blogPosts');
    await addDoc(blogRef, {
      ...validatedFields.data,
      slug: slugify(validatedFields.data.title),
      date: serverTimestamp(),
    });

    revalidatePath('/blog');
    revalidatePath('/admin');
    return { message: 'Blog post created successfully!' };
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Failed to create blog post.',
    };
  }
}

const ProductFormSchema = z.object({
  name: z.string().min(5, 'Product name must be at least 5 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  category: z.string().min(2, 'Category is required.'),
  imageId: z.string().min(1, 'Image ID is required.'),
  rating: z.coerce.number().min(0).max(5).optional(),
});

export type ProductState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    category?: string[];
    imageId?: string[];
    rating?: string[];
  };
  message?: string | null;
};

export async function createProduct(
  prevState: ProductState,
  formData: FormData
) {
  const validatedFields = ProductFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    imageId: formData.get('imageId'),
    rating: formData.get('rating'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to create product.',
    };
  }

  try {
    const productRef = collection(db, 'products');
    await addDoc(productRef, validatedFields.data);

    revalidatePath('/marketplace');
    revalidatePath('/admin');
    return { message: 'Product created successfully!' };
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Failed to create product.',
    };
  }
}
