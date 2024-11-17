import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../assets/Colors';
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/Ionicons";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // registration is successful
        alert("Registration Successful");
        router.push('/loginPage'); // Redirect to login page after successful registration
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Icon name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    <Image
                        source={require('../assets/images/register_pic.png')}
                        style={styles.image}
                    />
                </View>
            </SafeAreaView>

            <View style={styles.formContainer}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {/* Register */}
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegister}
                    >
                        <Text style={styles.registerButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                {/* Login */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already register? </Text>
                    <TouchableOpacity onPress={() => router.push('/loginPage')}>
                        <Text style={styles.loginLink}>Login here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_pink,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.darkPurple,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        width: 350,
        height: 350,
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 32,
    },
    input: {
        padding: 16,
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        marginBottom: 5,
        marginTop: 8,
        fontFamily: 'outfit',
    },

    registerButton: {
        marginTop:10,
        padding: 15,
        backgroundColor: Colors.darkPurple,
        borderRadius: 16,
    },
    registerButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'outfit-medium',
    },

    loginContainer:{
        marginTop:10,
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'outfit-medium'
    },
    loginLink:{
        color: Colors.primary,
        fontSize:17,
        textDecorationLine: 'underline',
        fontFamily: 'outfit-medium'
    },
    loginText:{
        fontSize:15,
        fontFamily: 'outfit-medium'
    }

});