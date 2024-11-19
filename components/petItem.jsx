import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../assets/Colors";
import {useRouter} from "expo-router"; // Replace with your custom Colors file
export default function PetItem({ pet }) {

    const router = useRouter();
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={()=>router.push({pathname:'/petDetails', params:pet})}>
            {/* Image Section */}
            <View style={styles.imgContainer} >
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

                    {/*<Button title={"TEST"} onPress={()=>navigation.navigate("Index")}></Button>*/}

                </View>
            </View>

            {/* Heart Icon */}
            <View style={styles.heartContainer}>
                <Ionicons name="heart-outline" size={24} color={Colors.primary} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 200,
        height: 250,
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
        backgroundColor:'rgba(255, 255, 255, 0.85)', // semi transparent background
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

    genderContainer:{
        flexDirection: 'row',
        gap:2
    },

    detailText: {
        fontFamily: 'outfit',
        fontSize: 12,
    },
    heartContainer: {
        position: 'absolute',
        height:30,
        width:30,
        top: 15,
        right: 15,
        backgroundColor: Colors.white,
        borderRadius: 50,
        padding: 3,
    },
});
