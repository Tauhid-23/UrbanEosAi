// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "studio-7956549997-c1db7",
  "appId": "1:913520408421:web:c03a7fc11d35f23ead138c",
  "storageBucket": "studio-7956549997-c1db7.firebasestorage.app",
  "apiKey": "AIzaSyCeaJOzzYpO2Fm4fT3Pn82NipZiCBApsak",
  "authDomain": "studio-7956549997-c1db7.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "913520408421"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});
const db = getFirestore(app);

export { app, auth, db };
