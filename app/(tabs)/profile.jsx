import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button, Image, TouchableOpacity} from 'react-native';
import Colors from '../../assets/Colors';
import {auth} from "../../config/FirebaseConfig";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function ProfileScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [user,setUser] = useState('');
    useEffect(()=>{
        const currUser= auth.currentUser;
        setUser(currUser)
    },[])

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

    function handleFavorite() {
        navigation.navigate('Favorite')
    }

    function handleChats(){
        navigation.navigate('Chat')
    }

    function handleAddNewPet() {
        navigation.navigate('AddPet')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImg}
                    source={require('../../assets/images/default-avatar-icon.jpg')}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.displayName}>
                        {user?.displayName || "Guest User"}
                    </Text>
                    <Text style={styles.email}>
                        {user?.email || "guest@example.com"}
                    </Text>
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="log-out" size={26} color={Colors.primary} />
                    </View>
                    <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleFavorite}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="star" size={26} color={Colors.primary} />
                    </View>
                    <Text style={styles.btnText}>Favorites</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleChats}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="chatbubble-ellipses" size={26} color={Colors.primary} />
                    </View>
                    <Text style={styles.btnText}>Chats</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleAddNewPet}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="add-circle" size={26} color={Colors.primary} />
                    </View>
                    <Text style={styles.btnText}>Add New Pet</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop:50
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: Colors.darkGrey,
        fontFamily: 'outfit-bold',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    infoContainer: {
        alignItems: 'center',
    },
    displayName: {
        fontSize: 22,
        fontFamily: 'outfit-medium',
        marginBottom: 5,
        color: Colors.black,
    },
    email: {
        fontSize: 16,
        color: Colors.lightGray,
        fontFamily: 'outfit',
    },
    buttonsContainer: {
        marginTop: 20,
        gap: 15,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        borderRadius: 10,
    },
    iconCircle: {
        backgroundColor: Colors.light_pink,
        borderRadius: 50,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        color: Colors.black,
        fontFamily: 'outfit',
    },
});
