import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const API_KEY = import.meta.env.VITE_API_KEY;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const APPID = import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "realtime-note-10fb4.firebaseapp.com",
  databaseURL: DATABASE_ID,
  projectId: "realtime-note-10fb4",
  storageBucket: "realtime-note-10fb4.appspot.com",
  messagingSenderId: "989249216027",
  appId: APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export { app, auth, db };
