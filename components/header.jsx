import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import { auth } from '../config/FirebaseConfig';
import {useRouter} from "expo-router";
import Colors from "../assets/Colors";
import {Ionicons} from "@expo/vector-icons";

export default function Header() {
    const router = useRouter();
    const [currentUser,setCurrentUser]=useState('')
    const [profileImage, setProfileImage] = useState('');

    useEffect(()=>{
        const user = auth.currentUser;
        setCurrentUser(user.displayName);
        setProfileImage(user.photoURL);

    },);
    function handleLogout() {
        auth.signOut()
            .then(() => {
                console.log('User signed out!');
                router.replace('/loginPage');
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    return (
        <View style={styles.headerRow}>
            {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImg} />
            ) : (
                <Image source={require("../assets/images/default-avatar-icon.jpg")} style={styles.profileImg} />
            )}
            <View>
                <Text style={styles.welcomeText}>Welcome,</Text>
                <Text style={styles.userName}>  {currentUser}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={25} color="white" style={styles.logoutIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    profileImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        marginLeft:15,
        marginTop: 30,
    },
    welcomeText: {
        fontFamily: 'outfit',
        fontSize: 30,
        marginTop: 30,
        color: Colors.darkGrey,
    },
    userName:{
        fontFamily: 'outfit',
        fontSize: 14,
        color:Colors.lightGray
    },
    btn: {
        marginLeft:90,
        backgroundColor: Colors.darkBlue,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 30,

    },

    logoutIcon: {
        marginLeft: 3,
    },
});