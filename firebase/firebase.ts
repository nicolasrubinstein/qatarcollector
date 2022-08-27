import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6okyIdTv7C1weZRW-rT1HDyLkm9Shkyg",
  authDomain: "album-1d9ad.firebaseapp.com",
  projectId: "album-1d9ad",
  storageBucket: "album-1d9ad.appspot.com",
  messagingSenderId: "813204078349",
  appId: "1:813204078349:web:d95d55b8ac108a9bad3a44",
  measurementId: "G-2GTM0LTN8G",
};

export const initApp = () => initializeApp(firebaseConfig);

export const initDb = (app: FirebaseApp) => getFirestore(app);
