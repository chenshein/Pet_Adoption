import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../assets/Colors';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function handleLogin() {
        //TODO handle login- check if the person exist and the username & password


        router.replace('/(tabs)/home'); // route after login

    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Icon name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    <Image
                        source={require('../assets/images/login_pic.png')}
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
        color: Colors.primary,
        fontSize:17,
        textDecorationLine: 'underline',
        fontFamily: 'outfit-medium'
    },
    registerText:{
        fontSize:15,
        fontFamily: 'outfit-medium'
    }

});
