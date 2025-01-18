import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // If using Firestore
import { getStorage } from "firebase/storage"; // If using Storage
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-wWy_SYovQSd0n8j3IZhTFkwHcBATgwo",
  authDomain: "crowdhelp-3c529.firebaseapp.com",
  projectId: "crowdhelp-3c529",
  storageBucket: "crowdhelp-3c529.firebasestorage.app",
  messagingSenderId: "299022473894",
  appId: "1:299022473894:web:3f87bcbbcc541e3764b267",
  measurementId: "G-4WVZ2GGD7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase services
export const auth = getAuth(app); // Authentication
export const firestore = getFirestore(app); // Firestore (optional)
export const storage = getStorage(app); // Storage (optional)
export { app, auth};
