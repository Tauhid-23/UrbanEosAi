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
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
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
