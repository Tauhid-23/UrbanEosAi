'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories, features, products as fallbackProducts } from '@/lib/data';
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
  Loader2,
} from 'lucide-react';
import type { Product } from '@/lib/types';
import Link from 'next/link';

async function getProducts(): Promise<Product[]> {
    try {
        const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);

        if (querySnapshot.empty) {
            return fallbackProducts.map((p, i) => ({ ...p, id: `prod-${i + 1}` }));
        }

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as Product));

    } catch (error) {
        console.error("Error fetching products:", error);
        return fallbackProducts.map((p, i) => ({ ...p, id: `prod-${i + 1}` }));
    }
}


export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        setLoading(false);
    }
    fetchProducts();
  }, []);

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/checkout">
              <Button variant="outline">Cart (2) $47.90</Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('All')}
            >
              <Leaf className="mr-2 h-4 w-4" /> All
            </Button>
            {categories.map((category) => (
              <Button
                variant={
                  selectedCategory === category.name ? 'default' : 'outline'
                }
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
              >
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
        {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        )}


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
                key={category.name}
                className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => setSelectedCategory(category.name)}
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
