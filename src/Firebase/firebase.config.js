import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtUdaCnIUPgSje75mTNpcM5FM_1wd3mo8",
  authDomain: "ecotrack-client.firebaseapp.com",
  projectId: "ecotrack-client",
  storageBucket: "ecotrack-client.firebasestorage.app",
  messagingSenderId: "359875211935",
  appId: "1:359875211935:web:8518afc1586cd8c25fa8aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);