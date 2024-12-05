import { useState, useEffect } from 'react';
import {auth} from "../../config/FirebaseConfig";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return unsubscribe;
    }, []);

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const signOut = () => {
        return auth.signOut();
    };

    return {
        user,
        signUp,
        signIn,
        signOut,
    };
};

export default useAuth;
