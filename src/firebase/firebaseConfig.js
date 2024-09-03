// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Get Auth instance
const auth = getAuth(app);

export { auth };