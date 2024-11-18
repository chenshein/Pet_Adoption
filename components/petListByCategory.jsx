import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../config/FirebaseConfig";
import CategoriesList from "./category";

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
        <View >
        </View>
    );
}