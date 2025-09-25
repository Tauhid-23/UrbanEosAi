
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// Define an extended User type to include our custom fields
export interface AppUser extends User {
  isAdmin?: boolean;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          // Combine Firebase user object with our custom data
          setUser({
            ...user,
            ...userDoc.data(),
          } as AppUser);
        } else {
           // This case can happen if a user authenticates but their Firestore doc hasn't been created yet
          await createUserProfile(user, user.displayName || 'Google User');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUserProfile = async (user: User, displayName: string) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            name: displayName,
            profileImage: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
            subscriptionPlan: 'free',
            isAdmin: false, // Default to not being an admin
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
        });
    }

     // To update the user state immediately after creation/sign-in
    const newUserDoc = await getDoc(userDocRef);
    if(newUserDoc.exists()) {
        setUser({ ...user, ...newUserDoc.data() } as AppUser);
    }
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName });
    await createUserProfile(user, displayName);
    return userCredential;
  };

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
    return userCredential;
  };
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    await createUserProfile(user, user.displayName!);
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
