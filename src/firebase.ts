import { initializeApp, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAslx0DAErpksR2dKzSGoEKY6t3ETLN2Us",
  authDomain: "roadlog-71b25.firebaseapp.com",
  projectId: "roadlog-71b25",
  storageBucket: "roadlog-71b25.appspot.com",
  messagingSenderId: "116771620203",
  appId: "1:116771620203:web:54d299bc90f3154ea9382e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(getApp());
export const db = getFirestore(getApp());
export const storage = getStorage(app);


export const googleAuthProvider = new GoogleAuthProvider()