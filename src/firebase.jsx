/** @format */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmegUB_aPhbS6LcvaARHRveoOufVzkDyk",
    authDomain: "sahara-in.firebaseapp.com",
    projectId: "sahara-in",
    storageBucket: "sahara-in.appspot.com",
    messagingSenderId: "666027051899",
    appId: "1:666027051899:web:c138f729a726f1b6568bde",
    measurementId: "G-L3DZDR2G9K"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optionally export analytics if you need it elsewhere
export { analytics };
