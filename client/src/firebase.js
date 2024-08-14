// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAlrA67p7NJ33cFK5KlMINOTiXjGf8V3tg",
  authDomain: "ems-portal-efef8.firebaseapp.com",
  projectId: "ems-portal-efef8",
  storageBucket: "ems-portal-efef8.appspot.com",
  messagingSenderId: "403796480576",
  appId: "1:403796480576:web:44f36a6ca1db48b83ac5a5",
  measurementId: "G-QR5XVSRRB7"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(firebaseApp);

// Initialize Auth
const firebaseAuth = getAuth();

export { firestore, firebaseAuth };