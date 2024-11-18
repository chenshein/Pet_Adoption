import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Button} from 'react-native';
import React, { useState } from 'react';
import Colors from '../assets/Colors'
import {Link, router, useRouter} from "expo-router";

export default function Index() {
    let Intro_img = require('../assets/images/Intro_pic.png');
    const router = useRouter();
    const handleLoginPress = () => {
        router.push('/loginPage');
    };
    const handleRegisterPress = () => {
        router.push('/registerPage');
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Index Img */}
                <View style={styles.imgContainer}>
                    <Image
                        source={Intro_img}
                        style={styles.imgContainer}
                        resizeMode="contain"
                    />
                </View>

                {/* Text content */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Make new Friends</Text>
                    <Text style={styles.subtitle}>
                        Here you can meet your dream friend and joy with them!
                    </Text>
                </View>

                {/* Navigation buttons */}
                <View style={styles.navigationContainer}>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegisterPress}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>

                    {/* Login button */}
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLoginPress} // OnPress event for login button
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    imgContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 10,
        fontFamily: 'outfit-bold',
    },
    subtitle: {
        fontSize: 18,
        color: Colors.white,
        textAlign: 'center',
        opacity: 0.8,
        fontFamily: 'outfit',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    registerButton: {
        backgroundColor: 'white',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 20,

    },
    registerButtonText: {
        color: Colors.primary,
        fontSize: 18,
        fontFamily: 'outfit',

    },
    loginButton: {
        backgroundColor: 'white',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 20,
    },
    loginButtonText: {
        color: Colors.primary,
        fontSize: 18,
        fontFamily: 'outfit',
    },
});

