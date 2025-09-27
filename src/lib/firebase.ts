// Firebase is disconnected for this static demo.

// In a real application, this file would initialize Firebase:
/*
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your config here
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
*/

// Exporting null objects for type compliance in the rest of the app
export const auth = null;
export const db = null;
