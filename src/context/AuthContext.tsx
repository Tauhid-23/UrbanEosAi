
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

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
        uid: firebaseUser.uid,
        isAdmin: customData.isAdmin || false,
        subscriptionPlan: customData.subscriptionPlan || 'free',
      } as AppUser;
    } else {
      // If no profile exists, create one with default user role
      const userProfileData = {
        name: firebaseUser.displayName || 'New User',
        email: firebaseUser.email,
        profileImage: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
        subscriptionPlan: 'free' as const,
        isAdmin: false, // Default role is NOT admin
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      };
      await setDoc(userDocRef, userProfileData);
      
      return {
        ...firebaseUser,
        uid: firebaseUser.uid,
        displayName: userProfileData.name,
        isAdmin: userProfileData.isAdmin,
        subscriptionPlan: userProfileData.subscriptionPlan,
      } as AppUser;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
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
    await updateProfile(userCredential.user, { displayName });
    
    // Explicitly create user profile document on sign-up
    const userDocRef = doc(db, 'users', userCredential.user.uid);
    const userProfileData = {
      name: displayName,
      email: email,
      subscriptionPlan: 'free' as const,
      isAdmin: false, // Ensure new users are not admins by default
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    };
    await setDoc(userDocRef, userProfileData);

    const appUser = await fetchUserProfile(userCredential.user);
    setUser(appUser);

    return userCredential;
  };

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, { lastLogin: serverTimestamp() });
    const appUser = await fetchUserProfile(user);
    setUser(appUser);
    return userCredential;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if a user profile exists, if not, create one.
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
       const userProfileData = {
        name: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
        subscriptionPlan: 'free' as const,
        isAdmin: false,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      };
      await setDoc(userDocRef, userProfileData);
    } else {
      await updateDoc(userDocRef, { lastLogin: serverTimestamp() });
    }
    const appUser = await fetchUserProfile(user);
    setUser(appUser);
    return result;
  };

  const logOut = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn: signIn,
    signInWithGoogle,
    signOut: logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
