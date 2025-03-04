// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-MoNfe2-i9BjzN285dP2NKcHRnU5Z0Dc",
    authDomain: "copernico-jv5v73.firebaseapp.com",
    projectId: "copernico-jv5v73",
    storageBucket: "copernico-jv5v73.firebasestorage.app",
    messagingSenderId: "189601532400",
    appId: "1:189601532400:web:9a4e91a8eba3a08c2f3535"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);