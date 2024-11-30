import React, {useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Alert} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import Colors from "../../assets/Colors";
import { useRouter } from 'expo-router';
import {auth, db} from "../../config/FirebaseConfig";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {deleteDoc, doc} from "firebase/firestore";

export default function PetDetails() {
    const pet = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);


    async function deletePet(){
        await deleteDoc(doc(db, "Pets", pet.id));
        console.log("pet deleted")
        router.push('/home')
    }


    return (
        <ScrollView style={styles.container}
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps="handled">
            <View>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Icon name="arrow-back" size={30} color='#C400FF' />
                </TouchableOpacity>
            </View>


            {/* Image Section */}
            <View style={styles.imgContainer}>
                <Image
                    source={{ uri: pet.imgURL }}
                    style={styles.petImage}
                    resizeMode="cover"
                />
            </View>

            {/* Pet Details */}
            <View style={styles.petDetails}>
                {/* Pet's name and breed */}
                <View style={styles.header}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petBreed}>{pet.breed}</Text>
                </View>
                {/* Info Row */}
                <View style={styles.infoRow}>
                    {/*  Gender */}
                    <View style={[styles.infoItem, { backgroundColor: '#E7F4F8' }]}>
                        <Text style={styles.detailTextPet}>{pet.gender}</Text>
                        <Text style={styles.detailText}>Sex</Text>
                    </View>
                    {/*  Age */}
                    <View style={[styles.infoItem,{ backgroundColor: '#FFF7EA' }]}>
                        <Text style={styles.detailTextPet}>{pet.age}</Text>
                        <Text style={styles.detailText}>Age</Text>
                    </View>
                    {/*  Weight */}
                    <View style={[styles.infoItem, { backgroundColor: '#F0F0FF' }]}>
                        <Text style={styles.detailTextPet}>{pet.weight} Kg</Text>
                        <Text style={styles.detailText}>Weight</Text>
                    </View>
                </View>

                {/*About*/}
                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutName}>About {pet.name},</Text>
                    <Text style={styles.aboutText}>{pet.about}</Text>
                </View>
                {/*Buttons*/}
                <View>
                    {pet.owner === auth.currentUser.email ? (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor:Colors.darkPurple },{marginTop:25}]}
                                onPress={() => {
                                    router.push(`/edit?pet=${encodeURIComponent(JSON.stringify(pet))}`);
                                }}
                            >
                                <Text style={styles.buttonText}>Edit ✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: "red" }]}
                                onPress={() => {
                                    // Handle delete logic here
                                    Alert.alert(
                                        "Confirm Delete",
                                        "Are you sure you want to delete this pet?",
                                        [
                                            { text: "Cancel", style: "cancel" },
                                            { text: "Delete", onPress: deletePet },
                                        ]
                                    );
                                }}
                            >
                                <Text style={styles.buttonText}>Delete 🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // If the current user doesn't own the pet, show the Chat button
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor:Colors.darkPurple },{marginTop:25}]}
                            onPress={() => {
                                router.push(`/chat?ownerEmail=${encodeURIComponent(pet.owner)}`);
                            }}
                        >
                            <Text style={styles.buttonText}>Chat 💬</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.white
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    imgContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.4,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    petImage: {
        width: '100%',
        height: '100%',
    },
    petDetails: {
        flex: 1,
        marginTop: -20,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    header: {
        gap:3,
        marginTop:10,
        marginBottom: 10,
        marginLeft:10
    },
    petName: {
        fontFamily: 'outfit-bold',
        fontSize: 27,
    },
    petBreed:{
        fontFamily: 'outfit',
        color: Colors.lightGray
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom:15
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginHorizontal: 12,
        borderRadius: 15,
        gap:2
    },
    detailTextPet:{
        fontFamily: 'outfit-medium',
        fontSize: 17,
    },
    detailText:{
        fontFamily: 'outfit',
        fontSize: 14,
        color:Colors.lightGray

    },
    aboutContainer:{
        gap:5,
    },
    aboutName:{
        fontFamily: 'outfit-medium',
        fontSize:19,

    },
    aboutText:{
        fontFamily: 'outfit',
        fontSize:15

    },

    buttonContainer: {
        justifyContent: "space-between",
        gap:5


    },
    button: {

        paddingVertical: 10,
        padding: 10,
        borderRadius: 10,
    },

    buttonText: {
        fontFamily: 'outfit',
        color: Colors.white,
        fontSize: 20,
        textAlign: "center",
    },
});

