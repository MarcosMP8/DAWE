// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmSc3P6lbrSr6AfZCCW4m1l0EBFs6JAw0",
  authDomain: "dawe-d0eb5.firebaseapp.com",
  projectId: "dawe-d0eb5",
  storageBucket: "dawe-d0eb5.appspot.com",
  messagingSenderId: "566646946546",
  appId: "1:566646946546:web:de19ba6224d5eadf27f37f",
  measurementId: "G-FG78BNM08N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
