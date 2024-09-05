// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBDgKZV6amY82VY5r2wZVSVpOAmD-SI_A",
  authDomain: "hotel-webapplication.firebaseapp.com",
  projectId: "hotel-webapplication",
  storageBucket: "hotel-webapplication.appspot.com",
  messagingSenderId: "129057272344",
  appId: "1:129057272344:web:9867487c5162a2f296c96d",
  measurementId: "G-EMYN60WNX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);  // Auth service
const db = getFirestore(app);  // Firestore service

// Export both services
export { auth, db };
