'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product } from '@/lib/types';

interface CartContextType {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (item: Product) => {
    setCartItems((prevItems) => {
      // For this demo, we'll just add the item. A real app might handle quantities.
      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
