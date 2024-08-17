// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ajio-clone-2682d.firebaseapp.com",
  projectId: "ajio-clone-2682d",
  storageBucket: "ajio-clone-2682d.appspot.com",
  messagingSenderId: "827509264468",
  appId: "1:827509264468:web:2ca4f94561635540e99dc1",
  measurementId: "G-YTWBVNB3M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);