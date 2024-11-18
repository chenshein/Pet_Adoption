import { firebase } from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDtS7D7y3rn0hkwvxL9IwVIbJcjO_YYLdM",
    authDomain: "pet-adoption-575a8.firebaseapp.com",
    projectId: "pet-adoption-575a8",
    storageBucket: "pet-adoption-575a8.firebasestorage.app",
    messagingSenderId: "632326338943",
    appId: "1:632326338943:web:da8d3c2da68a603821424a",
    measurementId: "G-J3CQC0W18H",
    databaseURL: "https://console.firebase.google.com/project/pet-adoption-575a8/firestore"
};


// Initialize Firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('init')
}

// Firestore database reference
export const db = firestore();
console.log('Firestore db:', db);  // Check if db is a valid firestore instance
