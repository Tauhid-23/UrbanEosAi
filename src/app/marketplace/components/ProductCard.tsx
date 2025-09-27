'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import { ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const image = PlaceHolderImages.find((p) => p.id === product.imageId);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: 'Added to Cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full">
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
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
          <p className="text-primary font-bold text-lg whitespace-nowrap">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2 pt-1">
          <Badge variant="secondary">{product.category}</Badge>
          {product.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 pt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
