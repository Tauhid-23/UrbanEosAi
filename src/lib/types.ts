import type { Timestamp } from 'firebase/firestore';

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  imageId: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageId: string;
  category: 'Seeds' | 'Tools' | 'Kits' | 'Soil & Care' | 'Containers';
  tags?: string[];
  rating: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Timestamp | string; // Firestore timestamp or string
  imageId: string;
  category: string;
};

export type Plant = {
  id: string;
  name: string;
  species: string;
  lastWatered: string;
  imageId: string;
};

export type Category = {
  id: string;
  name: 'Seeds' | 'Tools' | 'Kits' | 'Soil & Care' | 'Containers';
  description: string;
  icon: 'Sprout' | 'Wrench' | 'Package' | 'Container';
};

export type Feature = {
  name: string;
  description: string;
  icon: string;
};
