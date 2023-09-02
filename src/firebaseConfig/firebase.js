import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBY8tURfikumdiJJservV75LaHpdeVdW2k",
  authDomain: "receitas-toti.firebaseapp.com",
  projectId: "receitas-toti",
  storageBucket: "receitas-toti.appspot.com",
  messagingSenderId: "528262828554",
  appId: "1:528262828554:web:6a204894f427c9e74ac5f3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
