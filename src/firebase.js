// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration (from the Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyAtmEsBbq-o5fxpKmKdyubPhSdPqYAjehs",
  authDomain: "marketio-cf2fc.firebaseapp.com",
  projectId: "marketio-cf2fc",
  storageBucket: "marketio-cf2fc.firebasestorage.app",
  messagingSenderId: "403169724490",
  appId: "1:403169724490:web:37738cfe3042cc35abbeb3",
  measurementId: "G-TB2BRGC4S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth instance
export const auth = getAuth(app);
export default app;
