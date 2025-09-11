import { products } from '@/lib/data';
import ProductCard from './components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marketplace | Verdant Vista',
    description: 'Shop for curated gardening kits, tools, and supplies.',
};

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          The Marketplace
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Hand-picked organic kits, tools, and treatments for the urban gardener.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
