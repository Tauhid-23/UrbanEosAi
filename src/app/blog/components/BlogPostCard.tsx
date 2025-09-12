import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { BlogPost } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const image = PlaceHolderImages.find((p) => p.id === post.imageId);
  const postDate = post.date ? format(new Date(post.date), 'PPP') : 'Date not available';


  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {image && (
          <div className="relative h-48 w-full">
            <Image
              src={image.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <CardHeader>
          <Badge variant="outline" className="w-fit">{post.category}</Badge>
          <CardTitle className="mt-2 font-headline">{post.title}</CardTitle>
          <CardDescription>{post.excerpt}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
            <div>
                <p>{post.author}</p>
                <p>{postDate}</p>
            </div>
          <span className="flex items-center group-hover:text-primary transition-colors">
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
