import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    Platform
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { db } from "../../config/FirebaseConfig";
import Colors from "../../assets/Colors";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from "expo-image-picker";

export default function EditPage() {
    const { pet } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();

    const [petData, setPetData] = useState(() => {
        try {
            return pet ? JSON.parse(decodeURIComponent(pet)) : {};
        } catch (error) {
            console.error("Error parsing pet data:", error);
            return {};
        }
    });

    const [imageUri, setImageUri] = useState(petData.imgURL || null);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const pickImage = async () => {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "Permission Needed",
                "Sorry, we need camera roll permissions to make this work!"
            );
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedUri = result.assets[0].uri;
            setImageUri(selectedUri);
        }
    };

    const saveUpdateToDB = async () => {
        try {
            // Reference to the specific pet document
            const docRef = doc(db, "Pets", petData.id);

            // Update document with new data
            await updateDoc(docRef, {
                age: petData.age,
                about: petData.about,
                weight: petData.weight,
                //  update imgURL if it different
                ...(imageUri !== petData.imgURL && { imgURL: imageUri })
            });

            return true;
        } catch (error) {
            console.error("Error updating pet:", error);
            Alert.alert(
                "Update Error",
                "Could not save changes. Please try again."
            );
            return false;
        }
    };

    // Handle Save Action
    const handleSave = async () => {
        const updateSuccessful = await saveUpdateToDB();
        if (updateSuccessful) {
            router.replace({
                pathname: '/petDetails',
                params: {
                    ...petData,
                    imgURL: imageUri,
                    age: petData.age,
                    about: petData.about,
                    weight: petData.weight
                }
            });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: Colors.white }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={50}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        {/* Back Button */}
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => router.back()}
                            >
                                <Icon name="arrow-back" size={30} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>

                        {/* Image Section */}
                        <View style={styles.imgContainer}>
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.petImage}
                                resizeMode="cover"
                            />
                            <TouchableOpacity
                                style={styles.editImageButton}
                                onPress={pickImage}
                            >
                                <Icon name="pencil" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Pet Details */}
                        <View style={styles.petDetails}>
                            {/* Pet Name and Breed */}
                            <View style={styles.headerPet}>
                                <Text style={styles.petName}>{petData.name}</Text>
                                <Text style={styles.petBreed}>{petData.breed}</Text>
                            </View>

                            {/* Info Row */}
                            <View style={styles.infoRow}>
                                {/* Gender */}
                                <View style={[styles.infoItem, { backgroundColor: '#E7F4F8' }]}>
                                    <Text style={styles.detailTextPet}>{petData.gender}</Text>
                                    <Text style={styles.detailText}>Sex</Text>
                                </View>

                                {/* Age */}
                                <View style={[
                                    styles.infoItem,
                                    {
                                        backgroundColor: '#FFF7EA',
                                        borderWidth: 1,
                                        borderColor: '#B0B0B0',
                                        borderRadius: 10
                                    }
                                ]}>
                                    <TextInput
                                        style={styles.detailTextPet}
                                        value={petData.age}
                                        keyboardType="numeric"
                                        placeholder="Enter Age"
                                        onChangeText={(text) =>
                                            setPetData({ ...petData, age: text })
                                        }
                                    />
                                    <Text style={styles.detailText}>Age</Text>
                                </View>

                                {/* Weight */}
                                <View style={[
                                    styles.infoItem,
                                    {
                                        backgroundColor: '#F0F0FF',
                                        borderWidth: 1,
                                        borderColor: '#B0B0B0',
                                        borderRadius: 10
                                    }
                                ]}>
                                    <TextInput
                                        style={[styles.detailTextPet, { paddingLeft: 10 }]}
                                        value={petData.weight}
                                        keyboardType="numeric"
                                        onChangeText={(text) =>
                                            setPetData({ ...petData, weight: text })
                                        }
                                        placeholder="Enter weight"
                                    />
                                    <Text style={styles.detailText}>Weight</Text>
                                </View>
                            </View>

                            {/* About Section */}
                            <View style={styles.aboutContainer}>
                                <Text style={styles.aboutName}>
                                    About {petData.name},
                                </Text>
                                <TextInput
                                    style={[
                                        styles.aboutText,
                                        {
                                            paddingLeft: 10,
                                            borderWidth: 1,
                                            borderColor: '#B0B0B0',
                                            borderRadius: 10
                                        }
                                    ]}
                                    value={petData.about}
                                    onChangeText={(text) =>
                                        setPetData({ ...petData, about: text })
                                    }
                                    placeholder="Edit description"
                                    multiline
                                />
                            </View>

                            {/* Save Button */}
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveButtonText}>
                                    Save Changes
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'relative',
        zIndex: 10,
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
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    petImage: {
        width: '100%',
        height: '100%',
    },
    editImageButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.darkGrey,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    petDetails: {
        flex: 1,
        marginTop: -20,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    headerPet: {
        gap: 3,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    petName: {
        fontFamily: 'outfit-bold',
        fontSize: 27,
    },
    petBreed: {
        fontFamily: 'outfit',
        color: Colors.lightGray,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginHorizontal: 12,
        borderRadius: 15,
        gap: 2,
    },
    detailTextPet: {
        fontFamily: 'outfit-medium',
        fontSize: 17,
    },
    detailText: {
        fontFamily: 'outfit',
        fontSize: 14,
        color: Colors.lightGray,
    },
    aboutContainer: {
        gap: 5,
    },
    aboutName: {
        fontFamily: 'outfit-medium',
        fontSize: 19,
    },
    aboutText: {
        fontFamily: 'outfit',
        fontSize: 15,
        minHeight: 100,
    },
    saveButton: {
        marginTop: 25,
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        fontFamily: 'outfit-bold',
        fontSize: 24,
        color: Colors.white,
    },
});