
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// Define an extended User type to include our custom fields
export interface AppUser extends User {
  role?: 'user' | 'admin';
  subscriptionPlan?: 'free' | 'pro' | 'premium';
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (firebaseUser: User): Promise<AppUser> => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const customData = userDoc.data();
      // Combine Firebase user object with our custom data
      return {
        ...firebaseUser,
        role: customData.role,
        subscriptionPlan: customData.subscriptionPlan,
      };
    }
    // If doc doesn't exist, create it and return the combined object
    return await createUserProfile(firebaseUser, firebaseUser.displayName || 'New User');
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const appUser = await fetchUserProfile(firebaseUser);
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUserProfile = async (firebaseUser: User, displayName: string): Promise<AppUser> => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userProfileData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: displayName,
        profileImage: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
        subscriptionPlan: 'free' as const,
        role: 'user' as const,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
    };
    await setDoc(userDocRef, userProfileData, { merge: true });

    return { ...firebaseUser, ...userProfileData };
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    await updateProfile(firebaseUser, { displayName });
    const appUser = await createUserProfile(firebaseUser, displayName);
    setUser(appUser); // Set user state immediately after sign up
    return userCredential;
  };

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
    
    // Fetch and set custom user data on sign-in
    const appUser = await fetchUserProfile(userCredential.user);
    setUser(appUser);
    
    return userCredential;
  };
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseUser = userCredential.user;
    const appUser = await createUserProfile(firebaseUser, firebaseUser.displayName!);
    setUser(appUser); // Set user state immediately after Google sign-in
    return userCredential;
  };

  const logOut = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut: logOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
