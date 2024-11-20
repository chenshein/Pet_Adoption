import {useEffect, useState} from "react";
import {onAuthStateChanged} from "@react-native-firebase/auth";
import {auth} from "../../config/FirebaseConfig"

export default function useAuth(){
    const [user,setUser]= useState('');

    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,user=>{
            console.log(user)
            if(user) setUser(user);
            else setUser(null);
        })
        return unsub;
    },[])

    return {user};

}