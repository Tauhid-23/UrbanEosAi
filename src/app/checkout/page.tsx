'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  const shipping = cartItems.length > 0 ? 5.0 : 0;
  const total = cartTotal + shipping;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Items ({cartItems.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  const image = PlaceHolderImages.find(
                    (p) => p.id === item.imageId
                  );
                  return (
                    <div key={item.id}>
                      <div className="flex items-center gap-4 py-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden bg-secondary">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${item.price.toFixed(2)}
                          </p>
                          <Button
                            variant="link"
                            className="text-xs text-destructive h-auto p-0"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <Separator />}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Your cart is empty.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-semibold">${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping</p>
                <p className="font-semibold">${shipping.toFixed(2)}</p>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={cartItems.length === 0}>
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
          <div className="text-center">
            <Link href="/marketplace">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
