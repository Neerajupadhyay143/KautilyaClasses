// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmZLVR1oT110cEV-6Vf4tIcmirG6mvdyQ",
    authDomain: "kautilya-law-institute-3f1c6.firebaseapp.com",
    projectId: "kautilya-law-institute-3f1c6",
    storageBucket: "kautilya-law-institute-3f1c6.appspot.com",
    messagingSenderId: "929943388378",
    appId: "1:929943388378:web:0b6f11f736def22f8fa5e3",
    measurementId: "G-F8JT8R194S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);