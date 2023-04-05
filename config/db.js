// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjz8i8HhZHoUxF7tsDsDSDNHWPblYV_Y4",
  authDomain: "synth-6f232.firebaseapp.com",
  databaseURL: "https://synth-6f232-default-rtdb.firebaseio.com",
  projectId: "synth-6f232",
  storageBucket: "synth-6f232.appspot.com",
  messagingSenderId: "34010029822",
  appId: "1:34010029822:web:5322c56c22cf9616978faf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
