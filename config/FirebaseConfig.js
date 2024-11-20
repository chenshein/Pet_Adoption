import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Add other services if needed

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase Initialized');
} else {
    console.log('Firebase already initialized');
}

export const auth = firebase.auth();
export const db = firebase.firestore();
