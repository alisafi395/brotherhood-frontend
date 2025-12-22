import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (SAFE to keep in frontend)
const firebaseConfig = {
  apiKey: "AIzaSyBYbPQ6Ic3emd06RLaQ-OCCBufUhlL7ouI",
  authDomain: "brotherhood-3406a.firebaseapp.com",
  projectId: "brotherhood-3406a",
  storageBucket: "brotherhood-3406a.firebasestorage.app",
  messagingSenderId: "914124188144",
  appId: "1:914124188144:web:ebc69aee1a1dbd2e875535",
};

// Prevent re-initializing during Fast Refresh
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firebase Auth instance
export const auth = getAuth(app);
