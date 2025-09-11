import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gardening Resources | Verdant Vista',
    description: 'A curated list of helpful gardening resources, guides, and communities.',
};

const resources = [
    {
        title: "The Old Farmer's Almanac",
        description: "A comprehensive guide for planting times, frost dates, and gardening tips based on your location.",
        href: "https://www.almanac.com/gardening",
    },
    {
        title: "Reddit - r/gardening",
        description: "A large online community of gardeners sharing their successes, failures, and advice. Great for asking questions.",
        href: "https://www.reddit.com/r/gardening/",
    },
    {
        title: "National Gardening Association",
        description: "Offers a wealth of articles, plant databases, and educational materials for all skill levels.",
        href: "https://garden.org/",
    },
    {
        title: "Epic Gardening",
        description: "A modern resource with in-depth articles, podcasts, and videos on a wide range of gardening topics.",
        href: "https://www.epicgardening.com/",
    }
]

export default function ResourcesPage() {
    const bannerImage = PlaceHolderImages.find((img) => img.id === 'resources-banner');

  return (
    <div>
        {bannerImage && (
            <div className="relative w-full h-64 bg-secondary">
                <Image
                src={bannerImage.imageUrl}
                alt={bannerImage.description}
                fill
                className="object-cover"
                data-ai-hint={bannerImage.imageHint}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground">
                        Gardening Resources
                    </h1>
                </div>
            </div>
        )}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A curated collection of our favorite external websites, communities, and tools to help you grow.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {resources.map((resource) => (
                <Link href={resource.href} key={resource.title} target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="h-full hover:border-primary transition-colors duration-300">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-start font-headline">
                                {resource.title}
                                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{resource.description}</CardDescription>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>

      </div>
    </div>
  );
}
