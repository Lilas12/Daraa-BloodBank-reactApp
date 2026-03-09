import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3UuIGe2ordlIRAzLp5oTo4ssfpfBSwu4",
  authDomain: "blooddonation-65bbc.firebaseapp.com",
  projectId: "blooddonation-65bbc",
  storageBucket: "blooddonation-65bbc.firebasestorage.app",
  messagingSenderId: "452125770056",
  appId: "1:452125770056:web:cd4c900bc554c28d96b37d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
