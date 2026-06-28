import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzHMl2qGkl2gBiNMmpB1BZjw4Mrn6AG98",
  authDomain: "instagram-react-a18ba.firebaseapp.com",
  projectId: "instagram-react-a18ba",
  storageBucket: "instagram-react-a18ba.firebasestorage.app",
  messagingSenderId: "94791181674",
  appId: "1:94791181674:web:82c3161cf6db3fa3fef113",
  measurementId: "G-ZXYCDNKJTV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;