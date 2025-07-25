// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjy1rU_zklVqKf5KSFbRyzbzi3-QZCURo",
  authDomain: "controle-gastos-dev.firebaseapp.com",
  projectId: "controle-gastos-dev",
  storageBucket: "controle-gastos-dev.firebasestorage.app",
  messagingSenderId: "988917336260",
  appId: "1:988917336260:web:dcc6886b6cc9b6b3972191",
  measurementId: "G-H408WLKQKJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
