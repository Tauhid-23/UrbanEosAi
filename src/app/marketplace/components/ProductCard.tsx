import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const image = PlaceHolderImages.find((p) => p.id === product.imageId);

  return (
    <Card className="flex flex-col overflow-hidden">
      {image && (
        <div className="relative aspect-square w-full bg-secondary">
          <Image
            src={image.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
        <CardDescription className="text-primary font-bold text-lg">${product.price.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
