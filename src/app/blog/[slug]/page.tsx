import { notFound } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import type { Metadata, ResolvingMetadata } from 'next';
import type { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

type Props = {
  params: { slug: string };
};

async function getPost(slug: string): Promise<BlogPost | null> {
    try {
        const postsCollection = collection(db, 'blogPosts');
        const q = query(postsCollection, where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const docData = querySnapshot.docs[0].data();
        return {
            ...docData,
            date: (docData.date as Timestamp).toDate().toISOString(),
        } as BlogPost;

    } catch (error) {
        console.error("Error fetching post: ", error);
        return null;
    }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | UrbanEos AI`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
    const postsCollection = collection(db, 'blogPosts');
    const querySnapshot = await getDocs(postsCollection);
    return querySnapshot.docs.map((doc) => ({
      slug: doc.data().slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === post.imageId);
  const postDate = format(new Date(post.date), 'PPP');

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <Badge variant="default" className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-sm">
            By {post.author} on {postDate}
          </p>
        </header>

        {image && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg mb-12">
            <Image
              src={image.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-h1:font-headline prose-h2:font-headline prose-h3:font-headline prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
