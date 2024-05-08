import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "kepxo-af032.firebaseapp.com",
    projectId: "kepxo-af032",
    storageBucket: "kepxo-af032.appspot.com",
    messagingSenderId: "488740166782",
    appId: "1:488740166782:web:40e0d8df2a1c0f2b798c2f"
};

export const app = initializeApp(firebaseConfig);