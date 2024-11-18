import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../config/FirebaseConfig";
import CategoriesList from "./category";
import PetItem from "./petItem";

export default function PetListByCategory() {
    const [categoryPetList, setCategoryPetList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        if (selectedCategory) {
            getPetList(selectedCategory);
        }
    }, [selectedCategory]);

    async function getPetList(category) {
        try {
            const categoryPet = [];
            const querySnapshot = await db.collection("Pets").where("category", "==", category).get();
            querySnapshot.forEach((doc) => {
                categoryPet.push(doc.data());
            });
            setCategoryPetList(categoryPet);
        } catch (error) {
            console.error("Error accessing Firestore:", error);
        }
    }

    return (
        <View style={styles.container}>
            <CategoriesList category={(value) => getPetList(value)} />
            <Text style={styles.text}>Adopt Pet</Text>
            <FlatList
                data={categoryPetList}
                renderItem={({ item }) => <PetItem pet={item} />}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}  // Makes the list horizontal
                showsHorizontalScrollIndicator={false}  // Optional, hides the scrollbar
                contentContainerStyle={styles.listContent} // Ensures spacing and alignment
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    text: {
        fontFamily: 'outfit-medium',
        fontSize: 30,
        marginBottom: 10,
        marginTop: 20
    },

    listContent: {
        paddingHorizontal: 10,
    }
});