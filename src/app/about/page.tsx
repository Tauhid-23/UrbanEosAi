import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Verdant Vista',
    description: 'Learn about the mission and team behind Verdant Vista.',
};

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-8">
          Our Mission: Greening the Concrete Jungle
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          At Verdant Vista, we believe that everyone deserves a touch of nature, no matter how small their space. Our mission is to empower urban dwellers to cultivate their own green oases, fostering a deeper connection with the food they eat and the world around them.
        </p>

        {aboutImage && (
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg mb-12">
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are a passionate team of gardeners, technologists, and environmental enthusiasts who saw the potential for technology to simplify and enrich the practice of urban gardening. Frustrated by the lack of accessible, tailored advice for city life, we set out to create Verdant Vista.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4">What We Do</h2>
            <p className="text-muted-foreground leading-relaxed">
              We leverage the power of AI to provide personalized guidance, from selecting the right plants for your windowsill to diagnosing a pest problem on your balcony. Combined with our curated marketplace and educational resources, we provide a complete ecosystem for the modern urban gardener to succeed. Join us in making our cities greener, one plant at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
