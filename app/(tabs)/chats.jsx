import React, { useEffect, useState ,} from 'react';
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/FirebaseConfig";
import { getUserByEmail } from "../../shared/shared";
import Colors from "../../assets/Colors";
import {useRouter} from "expo-router";
import {useNavigation} from "@react-navigation/native";
import ChatItem from "../../components/chatItem";

export default function ChatsScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    const [chats, setChats] = useState([]);
    const [chatsList, setChatsList] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (auth.currentUser) {
            fetchChatsAndUsers();
        }
    }, );

    const fetchChatsAndUsers = async () => {
        try {
            const user = (auth.currentUser).email;
            if (!user) return;

            setCurrentUser(user);

            // fetch chats from db
            const chatsQuery = query(collection(db, 'Chats'), where('participants', 'array-contains', user));
            const querySnapshot = await getDocs(chatsQuery);
            const chatListFromDB = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // go throw all chats and put the relevant data in
            const processedChats = await Promise.all(chatListFromDB.map(async chat => {
                // find the other participant
                const otherParticipant = chat.participants.find(participant => participant !== user);
                // fetch other user details to get his displayName
                const otherUser = await getUserByEmail(otherParticipant);

                return {
                    id: chat.id,
                    otherUserName: otherUser.displayName,
                    otherUserEmail: otherParticipant,
                    lastMessage: chat.lastMessage,
                };
            }));

            setChats(chatListFromDB);
            setChatsList(processedChats);
            setIsLoading(false);
        } catch (error) {
            console.error("error fetching chats:", error);
            setIsLoading(false);
        }
    };


    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading Chats...↻</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Inbox 📥</Text>
            </View>
            {chatsList.length > 0 ? (
                <FlatList
                    data={chatsList}
                    renderItem={({ item, index }) => {
                        return <ChatItem chat={item} key={index} />;
                    }}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.chatList}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>No chats available</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 60,
        marginLeft: 15,
        fontFamily: 'outfit-bold',
        fontSize: 30,
        color: Colors.darkGrey
    },
    chatList: {
        padding: 15,
    },

    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        fontFamily: 'outfit',
        fontSize: 18,
        color: Colors.lightGray,
    },

});