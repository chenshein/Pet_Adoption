import firebase from 'firebase/compat/app'; // Use the compat version
import 'firebase/compat/analytics'; // For analytics
import 'firebase/compat/firestore'; // For Firestore

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDtS7D7y3rn0hkwvxL9IwVIbJcjO_YYLdM",
    authDomain: "pet-adoption-575a8.firebaseapp.com",
    projectId: "pet-adoption-575a8",
    storageBucket: "pet-adoption-575a8.firebasestorage.app",
    messagingSenderId: "632326338943",
    appId: "1:632326338943:web:da8d3c2da68a603821424a",
    measurementId: "G-J3CQC0W18H",
    databaseURL: "https://pet-adoption-575a8.firebaseio.com"
};

// Initialize Firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase Initialized');
}

// Firestore database reference
export const db = firebase.firestore();  // Use firebase.firestore() for Firestore
console.log('Firestore db:', db);  // Check if db is a valid Firestore instance
