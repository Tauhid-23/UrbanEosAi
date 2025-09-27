
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from 'firebase/auth';

// Define an extended User type to include our custom fields
export interface AppUser extends User {
  uid: string;
  isAdmin: boolean;
  subscriptionPlan: 'free' | 'pro' | 'premium';
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

// Create a mock user for the static demo
const createMockUser = (): AppUser => ({
  uid: 'mock-user-id',
  email: 'demo@example.com',
  displayName: 'Demo User',
  photoURL: 'https://i.pravatar.cc/150?u=mock-user-id',
  isAdmin: true, // Set to true to allow access to admin for demo purposes
  subscriptionPlan: 'pro',
  // Add other required User properties with mock data
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  providerId: 'password',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'mock-token',
  getIdTokenResult: async () => ({} as any),
  reload: async () => {},
  toJSON: () => ({}),
});


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // In the static demo, we immediately set a mock user after a short delay
  // to simulate a logged-in state for accessing the dashboard.
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('demo-user');
    if (sessionUser) {
      setUser(createMockUser());
    }
    setLoading(false);
  }, []);

  const setDemoUser = () => {
    const mockUser = createMockUser();
    setUser(mockUser);
    sessionStorage.setItem('demo-user', JSON.stringify(mockUser));
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setDemoUser();
    return Promise.resolve();
  };

  const signIn = async (email: string, password: string) => {
    setDemoUser();
    return Promise.resolve();
  };
  
  const signInWithGoogle = async () => {
    setDemoUser();
    return Promise.resolve();
  }

  const signOut = async () => {
    setUser(null);
    sessionStorage.removeItem('demo-user');
    return Promise.resolve();
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
