import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { auth, db } from "../../config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Colors from "../../assets/Colors";
import PetItem from "../../components/petItem";

export default function Favorite() {
    const [currUser, setCurrUser] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [numColumns, setNumColumns] = useState(2);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setCurrUser(user.email);
            fetchFavorites(user.email);
        }
    }, []);

    // fetch a pet by id
    async function fetchPet(petId) {
        const petRef = doc(db, "Pets", petId);
        const pet = await getDoc(petRef);
        if (pet.exists()) {
            return pet.data();
        }
        return null;
    }

    // fetch favorite pets by user email
    async function fetchFavorites(userEmail) {
        const userFavRef = doc(db, "UserFavPet", userEmail);
        try {
            const favPets = [];
            const docSnap = await getDoc(userFavRef);
            if (docSnap.exists()) {
                const favoritesArray = docSnap.data().favorites || [];

                // Use map to fetch all pets asynchronously
                const petPromises = favoritesArray.map((petId) => fetchPet(petId));
                const pets = await Promise.all(petPromises);

                // Set the fetched pets
                setFavorites(pets.filter(pet => pet !== null));
            } else {
                console.log("No such document!");
                setFavorites([]);
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            setFavorites([]);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites ❤️</Text>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    numColumns={numColumns}
                    key={numColumns}
                    renderItem={({ item }) => (
                        <View style={styles.petItemContainer}>
                            <PetItem pet={item} />
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noFavorites}>No favorites added yet!</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
        marginTop:60
    },
    title: {
        fontSize: 26,
        marginLeft:15,
        fontFamily: 'outfit-bold',
        marginBottom: 20,
        color: Colors.darkGrey,
    },

    noFavorites: {
        textAlign: 'center',
        fontSize: 16,
        color: '#aaa',
        marginTop: 32,
    },
    petItemContainer:{
        marginBottom:30
    }

});


