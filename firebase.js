// Firebase configuration and initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyAYhod73n3grrEYE5ibfWHrzKlyjzcBTl4",
  authDomain: "webbased-book-inventory.firebaseapp.com",
  projectId: "webbased-book-inventory",
  storageBucket: "webbased-book-inventory.firebasestorage.app",
  messagingSenderId: "1003216527570",
  appId: "1:1003216527570:web:a700a61afb3239c51d8d0b",
  measurementId: "G-3J25KN0284"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
