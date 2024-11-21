import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
import { db } from '../config/FirebaseConfig';
import Colors from "../assets/Colors";
import { useNavigation } from '@react-navigation/native';

export default function CategoriesList({category}) {
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Bird');
    const navigation = useNavigation();

    useEffect(() => {
        getCategories();
        handlePress(selectedCategory)
    }, []);

    async function getCategories() {
        try {
            const categories = [];
            const querySnapshot = await db.collection("Category").get();
            querySnapshot.forEach((doc) => {
                categories.push(doc.data());
            });
            setCategoriesList(categories);
        } catch (error) {
            console.error("Error accessing Firestore:", error);
        }
    }

    function handlePress(name) {
        setSelectedCategory(name);
        category(name);
    }

    return (
        <View>
            <Text style={styles.categoryText}>Categories</Text>
            <FlatList
                data={categoriesList}
                horizontal={true}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item.name)}>
                        <View style={styles.categoryItem}>
                            <View style={[
                                styles.imgContainer,
                                selectedCategory === item.name && styles.selectedCategory
                            ]}>
                                <Image
                                    source={{ uri: item.imgURL }}
                                    style={styles.categoryImage}
                                />
                            </View>
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    categoryText: {
        fontFamily: 'outfit-medium',
        fontSize: 30,
        marginBottom: 10,
    },
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12, // space between each item
    },
    imgContainer: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#f0e4fa',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    categoryName: {
        textAlign: "center",
        fontFamily: 'outfit',
        marginTop: 5,
        fontSize: 15,
    },
    selectedCategory:{
        backgroundColor:Colors.darkBlue
    }
});
