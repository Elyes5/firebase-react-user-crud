// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBrxfiV2-7J3s0rpWPl0rO4i9HtTdpGGAg",
  authDomain: "league-app-4a3f4.firebaseapp.com",
  projectId: "league-app-4a3f4",
  storageBucket: "league-app-4a3f4.appspot.com",
  messagingSenderId: "534161652099",
  appId: "1:534161652099:web:936b739ee77d9e05e71eb6",
  measurementId: "G-X86WJ8PE5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
