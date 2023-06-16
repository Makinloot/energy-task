import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { getDatabase, ref, push } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)

export const dbRef = ref(db, "results")

export const pushToDatabase = (value) => {
  push(dbRef, value)
}

export const handleSignup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const handleSignin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const handleSignout = () => {
  return signOut(auth)
}

export const handleResetPsw = (email) => {
  return sendPasswordResetEmail(auth, email)
}