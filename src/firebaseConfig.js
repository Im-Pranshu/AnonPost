import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const firebaseConfig = {
  apiKey: "AIzaSyBkOjL9v2tnCTMgcfjaK6HjDSGR7FEmhv8",
  authDomain: "anonpost-gen.firebaseapp.com",
  projectId: "anonpost-gen",
  storageBucket: "anonpost-gen.appspot.com",
  messagingSenderId: "807436030552",
  appId: "1:807436030552:web:856e40c8c503a5720cb02d",
  measurementId: "G-C5WWNFPYM5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth }; // Export both Firestore and Auth
