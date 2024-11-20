import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../assets/Colors';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '../config/FirebaseConfig';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function handleLogin() {
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // login successful
                const user = userCredential.user;
                console.log("Logged in as: ", user.email);
                router.replace('/(tabs)/home');
            })
            //login failed
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                console.error('error is:',error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Icon name="arrow-back" size={30} color='#C400FF' />
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    <Image
                        source={require('../assets/images/loginImg.jpg')}
                        style={styles.image}
                        resizeMode="contain"

                    />
                </View>
            </View>

            <View style={styles.formContainer}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    {/* login */}
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
                {/* Register */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Not registered yet? </Text>
                    <TouchableOpacity onPress={() => router.push('/registerPage')}>
                        <Text style={styles.registerLink}>Register here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
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
        backgroundColor: '#f8f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:60

    },
    image: {
        width: 350,
        height: 350,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#f8f2f2',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 32,
    },
    input: {
        padding: 16,
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginBottom: 5,
        marginTop: 8,
        fontFamily: 'outfit',
    },

    loginButton: {
        marginTop:10,
        padding: 15,
        backgroundColor: Colors.darkPurple,
        borderRadius: 16,
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'outfit-medium',
    },

    registerContainer:{
        marginTop:10,
         flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'outfit-medium'
    },
    registerLink:{
        color: Colors.darkBlue,
        fontSize:17,
        textDecorationLine: 'underline',
        fontFamily: 'outfit-medium'
    },
    registerText:{
        fontSize:15,
        fontFamily: 'outfit-medium'
    }

});
