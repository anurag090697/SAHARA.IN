/** @format */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const FIREBASE_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "sahara-in.firebaseapp.com",
  projectId: "sahara-in",
  storageBucket: "sahara-in.appspot.com",
  messagingSenderId: "666027051899",
  appId: "1:666027051899:web:c138f729a726f1b6568bde",
  measurementId: "G-L3DZDR2G9K",
  databaseURL: "https://sahara-in-default-rtdb.firebaseio.com", // Add your database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app); // Initialize Realtime Database and get a reference to the service

// Optionally export analytics if you need it elsewhere
export { analytics };
