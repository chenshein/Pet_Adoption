import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../assets/Colors";
import {useRouter} from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {auth, db} from "../config/FirebaseConfig";

export default function PetItem({ pet }) {

    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false); // if a pet is favorite
    const [currentUserEmail, setCurrentUserEmail] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setCurrentUserEmail(user.email);
            checkIfFavorite(user.email, pet.id);
        }
    }, [pet.id]);

    // Check if the pet is already in the user's favorites
    async function checkIfFavorite(userEmail, petId) {
        const userFavRef = doc(db, "UserFavPet", userEmail);
        try {
            const docSnap = await getDoc(userFavRef);
            const favoritesArray = docSnap.exists() ? docSnap.data().favorites : [];
            setIsFavorite(favoritesArray.includes(petId)); // Set state if pet is in favorites
        } catch (error) {
            console.error("Error fetching document:", error);
            setIsFavorite(false); // Default to not favorite if there's an error
        }
    }

    async function updateFav() {
        const userFavRef = doc(db, "UserFavPet", currentUserEmail);

        try {
            const docSnap = await getDoc(userFavRef);
            const favoritesArray = docSnap.exists() ? docSnap.data().favorites : [];
            let updatedFavorites;

            if (!isFavorite) { // need to add the pet
                updatedFavorites = [...favoritesArray, pet.id];
                setIsFavorite(true);
            } else {
                updatedFavorites = favoritesArray.filter((id) => id !== pet.id);
                setIsFavorite(false);
            }

            // Update the user's favorite list
            await setDoc(userFavRef, { favorites: updatedFavorites });
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    }

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => router.push({ pathname: '/petDetails', params: pet })}>
            {/* Image Section */}
            <View style={styles.imgContainer}>
                <Image source={{ uri: pet.imgURL }} style={styles.petImage} />
                {/* Info Section Overlaid */}
                <View style={styles.infoOverlay}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petBreed}>{pet.breed}</Text>

                    {/* Gender and Age Row */}
                    <View style={styles.detailsRow}>
                        <View style={styles.genderContainer}>
                            <Ionicons
                                name={pet.gender === 'Female' ? 'female-outline' : 'male-outline'}
                                size={16}
                                color={pet.gender === 'Female' ? Colors.light_pink : Colors.darkBlue}
                            />
                            <Text style={styles.detailText}>{pet.gender}</Text>
                        </View>
                        <Text style={styles.detailText}>{pet.age}</Text>
                    </View>
                </View>
            </View>

            {/* Heart Icon */}
            <TouchableOpacity style={styles.heartContainer} onPress={updateFav}>
                <Ionicons name={isFavorite ? "heart" : "heart-outline"}
                          size={24}
                          color={Colors.primary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 160,
        height: 210,
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 10,
        backgroundColor: Colors.white,
    },
    imgContainer: {
        width: '100%',
        height: '100%',
    },
    petImage: {
        width: '100%',
        height: '100%',
    },
    infoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // semi-transparent background
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    petName: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
        marginBottom: 1,
    },
    petBreed: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.lightGray,
        marginBottom: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 2
    },
    detailText: {
        fontFamily: 'outfit',
        fontSize: 12,
    },
    heartContainer: {
        position: 'absolute',
        height: 30,
        width: 30,
        top: 15,
        right: 15,
        backgroundColor: Colors.white,
        borderRadius: 50,
        padding: 3,
    },
});
