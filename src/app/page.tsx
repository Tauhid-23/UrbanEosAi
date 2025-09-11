import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, HeartPulse, PlayCircle, ShoppingBasket, Sprout, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { testimonials } from '@/lib/data';
import { Logo } from '@/components/Logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const analyticsImage = PlaceHolderImages.find((img) => img.id === 'analytics-dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                  Make Urban Gardening Simple
                  <span className="text-primary"> with AI Guidance</span>
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Transform your space into a lush, thriving garden with AI. We empower you to grow with confidence, from personalized recommendations to smart analytics, all through our curated marketplace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg h-14 px-8 font-bold">
                    Start Your Green Journey
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg h-14 px-8 font-bold">
                    <PlayCircle className="mr-2 h-6 w-6" />
                    Watch Demo
                  </Button>
                </div>
                <Card className="mt-8 bg-card border-2">
                  <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                    <p className="font-bold whitespace-nowrap">AI-driven gardening plan & personality</p>
                    <Input placeholder="e.g. I live in a flat with a small balcony" className="flex-grow" />
                    <Button>Get My Plan</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="relative h-80 md:h-[500px] w-full rounded-2xl overflow-hidden">
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
                 <Card className="absolute bottom-4 left-4 w-60 bg-background/80 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <Sprout className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-bold">AI Plant Doctor</CardTitle>
                                <CardDescription className="text-xs">With AI Guidance</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Everything you need for <span className="text-primary">urban gardening success</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                From AI-powered recommendations to an organic marketplace, we've got your back.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-left p-6">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                    <Sprout className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Plant Recommendations</h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized suggestions for plants that will thrive in your specific environment and with your lifestyle.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />AI-driven suggestions</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Personalized for your space</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Easy care instructions</li>
                </ul>
              </Card>
              <Card className="text-left p-6">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                    <HeartPulse className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Disease Detection</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a photo of a sick plant, and our AI will diagnose the issue and offer treatment solutions.
                </p>
                 <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Photo diagnosis</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Instant feedback</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Treatment plans</li>
                </ul>
              </Card>
              <Card className="text-left p-6">
                 <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                    <ShoppingBasket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Organic Marketplace</h3>
                <p className="text-muted-foreground mb-4">
                  Shop our curated selection of seeds, tools, and non-toxic treatments to ensure your garden is healthy.
                </p>
                 <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Curated products</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Organic & non-toxic</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Delivered to you</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold">
                        Track your garden&apos;s progress with <span className="text-primary">smart analytics</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Monitor your plant quality, generate patterns, and get data-driven improvement tips.
                    </p>
                </div>
                <div className="relative w-full h-[500px] md:h-[700px] rounded-2xl overflow-hidden border-2 shadow-lg">
                    {analyticsImage && (
                        <Image
                        src={analyticsImage.imageUrl}
                        alt={analyticsImage.description}
                        fill
                        className="object-cover object-top"
                        data-ai-hint={analyticsImage.imageHint}
                        />
                    )}
                </div>
            </div>
        </section>


        {/* Blog Section */}
        <section id="blog" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Learn from the <span className="text-primary">gardening experts</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Discover tips, best practices, and trends from our professionals.
              </p>
            </div>
            {/* Placeholder for blog posts */}
            <div className="text-center">
              <Button asChild>
                <Link href="/blog">Explore Our Blog</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Loved by <span className="text-primary">12,000+ urban gardeners</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                See how Growhaus is helping others with a green thumb.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => {
                const image = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                return (
                  <Card key={index} className="flex flex-col justify-between p-6">
                    <CardHeader className="p-0">
                      <div className="flex text-primary">
                        {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow my-4">
                      <p className="italic text-muted-foreground">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </CardContent>
                    <div className="flex items-center gap-4">
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
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Simple pricing for <span className="text-primary">every gardener</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                No hidden fees. Choose the plan that works for you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
              <Card className="p-8">
                <h3 className="text-2xl font-bold">Starter</h3>
                <p className="text-muted-foreground">For the curious beginner</p>
                <p className="text-4xl font-extrabold my-4">Free</p>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Basic plant recommendations</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Community access</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Email support</li>
                </ul>
                <Button variant="outline" className="w-full h-12 text-lg font-bold">Get Started for Free</Button>
              </Card>
              <Card className="p-8 border-2 border-primary shadow-2xl relative">
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>
                <h3 className="text-2xl font-bold text-primary">Pro</h3>
                <p className="text-muted-foreground">For the serious gardener</p>
                <p className="text-4xl font-extrabold my-4">$9<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> AI plant recommendations</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Smart plant analytics</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> AI disease detection</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Smart watering</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Priority support</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Marketplace discounts</li>
                </ul>
                <Button className="w-full h-12 text-lg font-bold">Start 14-Day Free Trial</Button>
              </Card>
              <Card className="p-8">
                <h3 className="text-2xl font-bold">Premium</h3>
                <p className="text-muted-foreground">For the master gardener</p>
                <p className="text-4xl font-extrabold my-4">$29<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Everything in Pro</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Multi-garden management</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Advanced analytics</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Personalized consultations</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Phone support</li>
                </ul>
                <Button variant="outline" className="w-full h-12 text-lg font-bold">Start Free Trial</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold">
                        Ready to start your <span className="text-primary">gardening journey?</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        And to know what to do when to get the maximum harvest with minimum effort.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="p-6">
                        <h3 className="font-bold text-lg mb-2">Book a consultation</h3>
                        <p className="text-muted-foreground mb-4">Our expert will help you to choose the best option for your needs.</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {[...Array(3)].map((_, i) => {
                                    const image = PlaceHolderImages.find(p => p.id === `testimonial-${i + 1}`);
                                    return (
                                        <Avatar key={i} className="-ml-2 border-2 border-background">
                                            {image && <AvatarImage src={image.imageUrl} alt="Reviewer" data-ai-hint={image.imageHint} />}
                                            <AvatarFallback>A</AvatarFallback>
                                        </Avatar>
                                    )
                                })}
                                <span className="ml-2 text-sm font-medium">+12k happy gardeners</span>
                            </div>
                             <Button variant="outline" className="font-bold">Book a Free Demo Now</Button>
                        </div>
                    </Card>
                     <Card className="p-6">
                        <h3 className="font-bold text-lg mb-2">Send us a message</h3>
                        <p className="text-muted-foreground mb-4">We are here to answer any questions you may have about Growhaus.</p>
                        <Button className="w-full font-bold text-lg h-12">Send a Message</Button>
                    </Card>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
