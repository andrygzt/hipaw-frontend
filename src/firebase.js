// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdKTFrJxHKCM4K68jEKEm3XNRG1huhJQQ",
  authDomain: "hi-paw.firebaseapp.com",
  databaseURL: "https://hi-paw-default-rtdb.firebaseio.com",
  projectId: "hi-paw",
  storageBucket: "hi-paw.appspot.com",
  messagingSenderId: "699408910635",
  appId: "1:699408910635:web:7daca5d02bb1ef409a5d6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
