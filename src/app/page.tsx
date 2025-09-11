import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sprout, HeartPulse, ShoppingBasket, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { testimonials } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const feature1Image = PlaceHolderImages.find((img) => img.id === 'feature-1');
  const feature2Image = PlaceHolderImages.find((img) => img.id === 'feature-2');
  const feature3Image = PlaceHolderImages.find((img) => img.id === 'feature-3');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-primary-foreground">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              priority
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
              Welcome to Verdant Vista
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
              Your personal AI-powered assistant for a thriving urban garden.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Cultivate with Confidence
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Everything you need to grow, from AI advice to premium products.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <Sprout className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">AI Plant Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get personalized plant suggestions based on your space,
                    location, and experience level.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <HeartPulse className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Health Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Log watering schedules, track growth, and monitor your
                    plant&apos;s health with ease.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <ShoppingBasket className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Curated Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Shop for organic kits, tools, and treatments hand-picked
                    for urban gardeners.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                From Our Community
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                See how Verdant Vista is helping others grow.
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => {
                  const image = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                  return (
                    <CarouselItem key={index} className="md:basis-1/2">
                      <div className="p-1 h-full">
                        <Card className="flex flex-col justify-between h-full">
                          <CardContent className="pt-6">
                            <p className="italic text-muted-foreground">
                              &quot;{testimonial.quote}&quot;
                            </p>
                          </CardContent>
                          <CardHeader className="flex-row items-center gap-4">
                            {image && (
                                <Avatar>
                                  <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />
                                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Ready to Start Your Garden?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg">
              Join Verdant Vista today and transform your urban space into a
              green oasis.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href="/signup">Sign Up for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
