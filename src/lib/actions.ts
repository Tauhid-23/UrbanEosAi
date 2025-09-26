
'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Schema for creating a new product
const ProductFormSchema = z.object({
  name: z.string().min(5, { message: 'Product name must be at least 5 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  category: z.string().min(2, { message: 'Category is required.' }),
  imageId: z.string().min(1, { message: 'Image ID is required.' }),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  adminId: z.string().min(1, { message: 'Admin ID is required.' }),
});

export type ProductState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    category?: string[];
    imageId?: string[];
    rating?: string[];
    adminId?: string[];
  };
  message?: string | null;
};

export async function createProduct(prevState: ProductState, formData: FormData): Promise<ProductState> {
  const validatedFields = ProductFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    imageId: formData.get('imageId'),
    rating: formData.get('rating'),
    adminId: formData.get('adminId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to create product.',
    };
  }

  const { adminId, ...productData } = validatedFields.data;

  try {
    const productsCollection = collection(db, 'products');
    const newProductRef = await addDoc(productsCollection, productData);
    
    // Log the audit action
    const auditLogsCollection = collection(db, 'auditLogs');
    await addDoc(auditLogsCollection, {
      adminId: adminId,
      action: 'updatedProduct', // Assuming 'updatedProduct' covers creation
      targetId: newProductRef.id,
      timestamp: serverTimestamp(),
      details: `Created new product: ${productData.name}`,
    });

    return { message: `Product "${productData.name}" created successfully.` };
  } catch (e) {
    console.error('Error creating product:', e);
    return {
      message: 'Database error. Failed to create product.',
    };
  }
}

// Schema for creating a new blog post
const BlogPostFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters.' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters.' }),
  category: z.string().min(2, { message: 'Category must be at least 2 characters.' }),
  author: z.string().min(2, { message: 'Author must be at least 2 characters.' }),
  imageId: z.string().min(1, { message: 'Image ID is required.' }),
  adminId: z.string().min(1, { message: 'Admin ID is required.' }),
});

export type BlogPostState = {
  errors?: {
    title?: string[];
    excerpt?: string[];
    content?: string[];
    category?: string[];
    author?: string[];
    imageId?: string[];
    adminId?: string[];
  };
  message?: string | null;
};

// Server action to create a blog post
export async function createBlogPost(prevState: BlogPostState, formData: FormData): Promise<BlogPostState> {
  const validatedFields = BlogPostFormSchema.safeParse({
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    category: formData.get('category'),
    author: formData.get('author'),
    imageId: formData.get('imageId'),
    adminId: formData.get('adminId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to create blog post.',
    };
  }

  const { adminId, title, ...postData } = validatedFields.data;
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


  try {
    const blogPostsCollection = collection(db, 'blogPosts');
    const newPostRef = await addDoc(blogPostsCollection, {
      ...postData,
      title,
      slug,
      date: serverTimestamp(), // Use server timestamp for creation date
    });

    // Log the audit action
    const auditLogsCollection = collection(db, 'auditLogs');
    await addDoc(auditLogsCollection, {
      adminId: adminId,
      action: 'updatedBlog', // Assuming 'updatedBlog' covers creation
      targetId: newPostRef.id,
      timestamp: serverTimestamp(),
      details: `Created new blog post: ${title}`,
    });

    return { message: `Blog post "${title}" created successfully.` };
  } catch (e) {
    console.error('Error creating blog post:', e);
    return {
      message: 'Database error. Failed to create blog post.',
    };
  }
}
