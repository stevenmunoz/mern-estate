// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-6db29.firebaseapp.com",
  projectId: "mern-state-6db29",
  storageBucket: "mern-state-6db29.appspot.com",
  messagingSenderId: "767472107419",
  appId: "1:767472107419:web:c01f6f5b0b06051ff26b3e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);