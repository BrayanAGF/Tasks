// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANy2KSiFML-Q-n6dILPa4rF6vYqImMiH8",
  authDomain: "tasks-2b2e9.firebaseapp.com",
  projectId: "tasks-2b2e9",
  storageBucket: "tasks-2b2e9.appspot.com",
  messagingSenderId: "406279575230",
  appId: "1:406279575230:web:0d29a0492008d1db8c70ef",
  measurementId: "G-9ZBNH1Q7DD"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);
