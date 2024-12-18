// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy8Wk5PmaQ8x67nxbf_TdvDdl7EYq5VME",
  authDomain: "carbo-d3275.firebaseapp.com",
  projectId: "carbo-d3275",
  storageBucket: "carbo-d3275.firebasestorage.app",
  messagingSenderId: "464706717494",
  appId: "1:464706717494:web:2ef4e2d2bbc2f308d39597",
  measurementId: "G-EVPG40B8XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export  {db}