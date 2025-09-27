
import BlogPostCard from './components/BlogPostCard';
import type { Metadata } from 'next';
import type { BlogPost } from '@/lib/types';
import { blogPosts as fallbackBlogPosts } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Blog | UrbanEos AI',
    description: 'Explore articles on urban gardening, plant care, and sustainability.',
};

// For the static demo, we will use the fallback data directly.
async function getBlogPosts(): Promise<BlogPost[]> {
    return fallbackBlogPosts.map((p, i) => ({
        id: `post-${i}`,
        ...p,
        slug: p.title.toLowerCase().replace(/\s+/g, '-'),
        date: new Date(Date.now() - (i * 1000 * 60 * 60 * 24 * 3)).toISOString(),
    }));
}


export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          The UrbanEos AI Blog
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
