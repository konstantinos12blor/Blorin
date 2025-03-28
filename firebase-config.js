// firebase-config.js
// Εδώ βάζεις τις ρυθμίσεις του Firebase

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUuRiIl1JECBQix2CUL-zGxktVmckdSY8",
  authDomain: "blori-864c4.firebaseapp.com",
  projectId: "blori-864c4",
  storageBucket: "blori-864c4.firebasestorage.app",
  messagingSenderId:"939801048481",
  appId: "1:939801048481:web:fee7c5946fcc6a69f047e0",
  measurementId: "G-MZGK4MDTWY"
};

// Αρχικοποίηση Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
