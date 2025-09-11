import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products, categories, features } from '@/lib/data';
import ProductCard from './components/ProductCard';
import {
  Container,
  Package,
  Search,
  Sprout,
  Wrench,
  Leaf,
  Star,
  Ship,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Organic Gardening Marketplace | Growhaus',
  description: 'Find everything you need for your urban garden - from premium seeds to smart tools.',
};

export default function MarketplacePage() {
  const categoryIcons: { [key: string]: React.ReactNode } = {
    Seeds: <Sprout className="h-8 w-8 text-primary" />,
    Tools: <Wrench className="h-8 w-8 text-primary" />,
    Kits: <Package className="h-8 w-8 text-primary" />,
    'Soil & Care': <Sprout className="h-8 w-8 text-primary" />,
    Containers: <Container className="h-8 w-8 text-primary" />,
  };
  const featureIcons: { [key: string]: React.ReactNode } = {
    '100% Organic': <Leaf className="h-8 w-8 text-primary" />,
    'Fast Shipping': <Ship className="h-8 w-8 text-primary" />,
    'Expert Curated': <Star className="h-8 w-8 text-primary" />,
  };
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Organic Gardening <span className="text-primary">Marketplace</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Find everything you need for your urban garden - from premium seeds
            to smart tools.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full"
              />
            </div>
            <Link href="/checkout">
              <Button variant="outline">Cart (0) $0.00</Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <Button variant="default">
              <Leaf className="mr-2 h-4 w-4" /> All
            </Button>
            {categories.map((category) => (
              <Button variant="outline" key={category.id}>
                {category.icon === 'Sprout' && (
                  <Sprout className="mr-2 h-4 w-4" />
                )}
                {category.icon === 'Wrench' && (
                  <Wrench className="mr-2 h-4 w-4" />
                )}
                {category.icon === 'Package' && (
                  <Package className="mr-2 h-4 w-4" />
                )}
                {category.icon === 'Container' && (
                  <Container className="mr-2 h-4 w-4" />
                )}
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">
              Everything you need for successful urban gardening
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {categoryIcons[category.name]}
                </div>
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {
                    products.filter((p) => p.category === category.name).length
                  }{' '}
                  products
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.name}>
              <div className="flex justify-center mb-4">
                {featureIcons[feature.name]}
              </div>
              <h3 className="font-bold text-lg">{feature.name}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
