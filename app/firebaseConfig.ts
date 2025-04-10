import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdx7T4s2J5xqfGjJb8SvXjc3cT9zM7Atk",
  authDomain: "your-auth-domain",
  projectId: "soulgood-57985",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "105840966638",
  appId: "1:105840966638:android:d27edbd157884711922cff"
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };