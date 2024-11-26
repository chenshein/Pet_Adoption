import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../assets/Colors';
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/Ionicons";
import { auth,db } from '../config/FirebaseConfig';
import {doc, setDoc} from "firebase/firestore";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();


    async function addToDB() {
        console.log("Adding user to DB...");
        try {
            await setDoc(doc(db, "Users", email.toLowerCase()), {
                email: email.toLowerCase(),
                displayName: username,
            });
            console.log("User added to Firestore successfully");
        } catch (error) {
            console.error("Error adding user to DB:", error);
        }
    }

    async function handleRegister() {
        if (email && password && confirmPassword && username) {
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            try {
                await addToDB();
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('User registered successfully: ', user);

                        user.updateProfile({
                            displayName: username,
                        })
                            .then(() => {
                                console.log('User profile updated');
                                alert("Registration Successful");
                                router.push('/loginPage');
                            })
                            .catch((error) => {
                                console.error('Error updating profile:', error);
                                alert(`Error: ${error.message}`);
                            });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error('Registration error:', errorCode, errorMessage);
                        alert(`Error: ${errorMessage}`);
                    });
            } catch (error) {
                console.error("Error adding to DB: ", error);
            }
        } else {
            alert("Please fill all fields.");
        }
    }



    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Icon name="arrow-back" size={30} color="#C400FF" />
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    <Image
                        source={require('../assets/images/registerImg.jpg')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <View style={styles.formContainer}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor={Colors.lightGray}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={Colors.lightGray}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor={Colors.lightGray}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Confirm Password"
                        placeholderTextColor={Colors.lightGray}
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
        backgroundColor:'#f8f2f2',
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
        backgroundColor: Colors.white,
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
        backgroundColor: Colors.white,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 32,
    },
    input: {
        padding: 16,
        backgroundColor: '#f4f4f6',
        borderRadius: 16,
        marginBottom: 5,
        marginTop: 8,
        fontFamily: 'outfit',
    },

    registerButton: {
        marginTop:10,
        padding: 15,
        backgroundColor: Colors.primary,
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
        color: Colors.darkBlue,
        fontSize:17,
        textDecorationLine: 'underline',
        fontFamily: 'outfit-medium'
    },
    loginText:{
        fontSize:15,
        fontFamily: 'outfit-medium'
    }

});