import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Dimensions} from 'react-native';
import { auth } from '../config/FirebaseConfig';
import {useRouter} from "expo-router";
import Colors from "../assets/Colors";
import {Ionicons} from "@expo/vector-icons";

export default function Header() {
    const router = useRouter();
    const [currentUser,setCurrentUser]=useState('')
    useEffect(()=>{
        const user = auth.currentUser;
        setCurrentUser(user.displayName);
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
            <Text  style={styles.welcomeText}> Welcome, {currentUser}</Text>
            <TouchableOpacity style= {styles.btn} onPress={handleLogout} >
                <Ionicons name="log-out-outline" size={25} color={'white'} style={{marginLeft:3}}></Ionicons>
            </TouchableOpacity>

        </View>
    );
}

const styles =StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    welcomeText: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginBottom: 20,
        marginTop: 10,
        color: Colors.darkGrey,
    },
    btn: {
        marginRight:10,
        backgroundColor: Colors.darkBlue,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    btnText: {
        color: 'white', // White text on dark background
        fontSize: 13,
        fontFamily: 'outfit-medium', // Font weight
        textAlign: 'center', // Center align text inside the button
    }
});