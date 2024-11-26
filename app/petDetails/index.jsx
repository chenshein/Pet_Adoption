import React, { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../assets/Colors";
import { useRouter } from 'expo-router';
import {auth} from "../../config/FirebaseConfig";

export default function PetDetails() {
    const pet = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={styles.container}>
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
                        <Text style={styles.detailTextPet}>{pet.weight}</Text>
                        <Text style={styles.detailText}>Weight</Text>
                    </View>
                </View>

                {/*About*/}
                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutName}>About {pet.name},</Text>
                    <Text style={styles.aboutText}>{pet.about}</Text>
                </View>

                {/* Call-to-Action Button */}
                <TouchableOpacity
                    style={styles.adoptButton}
                    onPress={() => {
                        if (pet.owner === (auth.currentUser).email) {
                            router.push(`/edit-pet?petId=${encodeURIComponent(pet.id)}`);
                        } else {
                            router.push(`/chat?ownerEmail=${encodeURIComponent(pet.owner)}`);
                        }
                    }}
                >

                    <Text style={styles.adoptButtonText}>
                        {pet.owner === (auth.currentUser).email ? "Edit" : "Adopt Me"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 4,
    },
    imgContainer: {
        width: '100%',
        height: '40%',
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



    adoptButton: {
        marginTop: 25,
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adoptButtonText: {
        fontFamily: 'outfit-bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
});
