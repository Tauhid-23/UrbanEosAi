import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Plant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Droplets } from 'lucide-react';

export default function PlantCard({ plant }: { plant: Plant }) {
  const image = PlaceHolderImages.find((p) => p.id === plant.imageId);

  return (
    <Card>
      {image && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={image.imageUrl}
            alt={plant.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline">{plant.name}</CardTitle>
        <CardDescription>{plant.species}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Droplets className="mr-2 h-4 w-4" />
          <span>Last watered: {plant.lastWatered}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}
