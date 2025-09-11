import { blogPosts } from '@/lib/data';
import BlogPostCard from './components/BlogPostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Verdant Vista',
    description: 'Explore articles on urban gardening, plant care, and sustainability.',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          The Verdant Vista Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your source for urban gardening tips, plant care advice, and sustainable living.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
