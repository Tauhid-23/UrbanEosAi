import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { blogPosts as fallbackBlogPosts } from '@/lib/data';
import BlogPostCard from './components/BlogPostCard';
import type { Metadata } from 'next';
import type { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

export const metadata: Metadata = {
    title: 'Blog | UrbanEos AI',
    description: 'Explore articles on urban gardening, plant care, and sustainability.',
};

async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const postsCollection = collection(db, 'blogPosts');
        const q = query(postsCollection, orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('No blog posts found in Firestore, using fallback data.');
            // This is a simplified fallback. In a real app, you might want more robust error handling.
            return fallbackBlogPosts.map(p => ({
                ...p,
                slug: p.title.toLowerCase().replace(/\s+/g, '-'),
                date: new Date().toISOString(),
            }));
        }

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            const post: BlogPost = {
                slug: data.slug,
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                author: data.author,
                // Convert Firestore Timestamp to a serializable format (ISO string)
                date: data.date.toDate().toISOString(),
                imageId: data.imageId,
                category: data.category,
            };
            return post;
        });
    } catch (error) {
        console.error("Error fetching blog posts: ", error);
        // Fallback to static data if Firestore fetch fails
        return fallbackBlogPosts.map(p => ({
            ...p,
            slug: p.title.toLowerCase().replace(/\s+/g, '-'),
            date: new Date().toISOString(),
        }));
    }
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
