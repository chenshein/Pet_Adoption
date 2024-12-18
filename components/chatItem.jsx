
import React, {useEffect, useState, useRef} from "react";
import {Image, Text, TouchableOpacity, View,StyleSheet} from "react-native";
import Colors from "../assets/Colors";
import {Link, useRouter} from "expo-router";
import {useNavigation} from "@react-navigation/native";
import {getUserByEmail} from "../shared/shared";

import Chat from "../app/chat"


export default function ChatItem({chat}) {
    const router = useRouter();
    const navigation = useNavigation();
    const [user,setUser]= useState('')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUserByEmail(chat.otherUserEmail);
                setUser(fetchedUser);
                console.log(fetchedUser.photoURL);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [chat.otherUserEmail]);

    function handleChatPress() {
        const otherUser = chat.otherUserEmail
        router.push(`/chat?ownerEmail=${otherUser}`);
    }

    return(
        <TouchableOpacity style={styles.chatItem} onPress={handleChatPress}>
            <Image
                style={styles.userImg}
                source={{ uri: user.photoURL }}
            />
            <View>
                <Text style={styles.chatUserName}>{chat.otherUserName}</Text>
                <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            </View>
        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({
    chatItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        alignItems: 'center',
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 15,
    },
    chatUserName: {
        fontFamily: 'outfit-bold',
        fontSize: 19,
        color: Colors.darkGrey,
    },
    lastMessage: {
        fontFamily: 'outfit',
        marginLeft: 8,
        marginTop: 5,
        fontSize: 14,
        color: Colors.lightGray
    },
})