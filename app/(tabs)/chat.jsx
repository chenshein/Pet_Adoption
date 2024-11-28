import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView, Image} from 'react-native';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/FirebaseConfig";
import {getUserByEmail} from "../../shared/shared";
import Colors from "../../assets/Colors";

export default function ChatScreen() {
    const [chats, setChats] = useState([]);
    const [chatsList, setChatsList] = useState([]);
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        const user = auth.currentUser.email;
        setCurrentUser(user);
        getChatsFromDB();
    }, []);

    useEffect(() => {
        if (chats.length > 0) {
            chatsToList();
        }
    }, [chats]);




    async function chatsToList() {
        const processedChats = await Promise.all(chats.map(async chat => {
            // other user email
            const otherParticipant = chat.participants.find(participant => participant !== currentUser);
            const otherUser = await getUserByEmail(otherParticipant)
            console.log("USERRRR", otherUser)
            return {
                id: chat.id,
                otherUserName: otherUser.displayName,
                otherUserEmail : otherParticipant,
                lastMessage: chat.lastMessage,
            };
        }));
        setChatsList(processedChats);
    }

    async function getChatsFromDB() {
        const chatsQuery = query(collection(db, 'Chats'), where('participants', 'array-contains', currentUser));
        const querySnapshot = await getDocs(chatsQuery);
        const chatListFromDB = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setChats(chatListFromDB);
    }

    const renderItem = ({ item }) => (
        <View style={styles.chatItem}>
            <Image style={styles.userImg} source={require('../../assets/images/default-avatar-icon.jpg')} />
            <View >
                <Text style={styles.chatUserName}>{item.otherUserName}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Inbox 📥</Text>
            </View>
            <FlatList
                data={chatsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        marginTop:60,
        marginLeft:15,
        fontFamily: 'outfit-bold',
        fontSize:30,
        color:Colors.darkGrey
    },
    chatList: {
        padding: 15,
    },
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
        color:Colors.darkGrey,
    },
    lastMessage: {
        fontFamily: 'outfit',
        marginLeft:8,
        marginTop: 5,
        fontSize: 14,
        color: Colors.lightGray

    },
});