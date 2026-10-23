import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase console se mila hua config yahan replace kar dena bhai
const firebaseConfig = {
  apiKey: "AIzaSyDGguRzu6tRBebS1a1WjlH5nKEQ13QINyA",
  authDomain: "expense-tracker-ca241.firebaseapp.com",
  projectId: "expense-tracker-ca241",
  storageBucket: "expense-tracker-ca241.firebasestorage.app",
  messagingSenderId: "657387186437",
  appId: "1:657387186437:web:4664c7890aefd422d8af6c",
  measurementId: "G-88W854T635"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);