
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// Define an extended User type to include our custom fields
export interface AppUser extends User {
  role: 'user' | 'admin';
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // This function fetches the Firestore user profile and merges it with the Firebase Auth user object.
  const fetchUserProfile = async (firebaseUser: User): Promise<AppUser> => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const customData = userDoc.data();
      // Merge the firebase user object with the custom data from firestore
      return {
        ...firebaseUser,
        role: customData.role || 'user',
        subscriptionPlan: customData.subscriptionPlan || 'free',
      } as AppUser;
    } else {
      // If no profile exists, create one with default 'user' role
      const userProfileData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'New User',
        email: firebaseUser.email,
        profileImage: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
        subscriptionPlan: 'free' as const,
        role: 'user' as const, // Default role
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      };
      await setDoc(userDocRef, userProfileData);
      return {
        ...firebaseUser,
        ...userProfileData,
      } as AppUser;
    }
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

  const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Update Firebase Auth profile
    await updateProfile(firebaseUser, { displayName });

    // Create Firestore user document
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userProfileData = {
        uid: firebaseUser.uid,
        name: displayName,
        email: firebaseUser.email,
        profileImage: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
        subscriptionPlan: 'free' as const,
        role: 'user' as const, // Explicitly set role on creation
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
    };
    await setDoc(userDocRef, userProfileData);
    
    // Set user in state
    setUser({ ...firebaseUser, ...userProfileData } as AppUser);
    
    return userCredential;
  };

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const appUser = await fetchUserProfile(userCredential.user);
    setUser(appUser);
    
    // Update last login time
    const userDocRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
    
    return userCredential;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const appUser = await fetchUserProfile(userCredential.user);
    setUser(appUser);
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
