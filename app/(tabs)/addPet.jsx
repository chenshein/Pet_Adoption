import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, TextInput,Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { auth,db } from "../../config/FirebaseConfig";
import { getCategories } from "../../shared/shared";
import Colors from "../../assets/Colors";
import { Ionicons } from '@expo/vector-icons';
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import {useNavigation} from "@react-navigation/native";

export default function AddPet() {
    const [categories, setCategories] = useState([]);

    const [owner, setOwner] = useState('');
    const [petName, setPetName] = useState('');
    const [category, setCategory] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [about, setAbout] = useState('');
    const [img, setImg] = useState('');

    const [isCategoryPickerVisible, setCategoryPickerVisible] = useState(false);
    const [isGenderPickerVisible, setGenderPickerVisible] = useState(false);

    const navigation = useNavigation();


    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
        };
        fetchCategories();
        const petOwner = (auth.currentUser).email;
        setOwner(petOwner);
    }, []);


    const resetFields = () => {
        setPetName('');
        setCategory('');
        setBreed('');
        setAge('');
        setGender('');
        setWeight('');
        setAbout('');
        setImg(null); // Reset the image as well
    };

    function handleSavePet(){
        if (!petName || !category || !breed || !age || !gender || !weight || !about) {
            console.log("empty")
            Alert.alert("Missing Information ⚠️", "Please make sure you have filled in all the fields!");
        }
        else {
            addPetToDB();
            console.log("Pet added to db ! ")
            resetFields();
            Alert.alert("Pet added!🐾", "Would you like to return to the homepage or add another pet?",
                [
                    {
                        text: "Home 🏠",  onPress: ()=> navigation.navigate('Home')
                    },
                    {
                        text: "Add new pet 🐇", onPress: ()=> navigation.navigate('AddPet')
                    }
                ])

        }
    }


    async function addPetToDB(){
        try {
            const docRef = await addDoc(collection(db, "Pets"), {
                name: petName,
                category: category,
                breed: breed,
                age: age,
                gender: gender,
                weight: weight,
                about: about,
                owner: owner,
                imgURL: img
            });
            console.log("Document written with ID: ", docRef.id);
            const petDocID = docRef.id;
            await updateDoc(doc(db, "Pets", petDocID), {
                id: petDocID
            });
        }catch (err) {
            console.error(err)
            Alert.alert("Can't save pet ", "Problem in saving the pet, try again");
        }
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log("after")
        if(!result.canceled){
            setImg(result.assets[0].uri);
            console.log(result.assets[0].uri)
        }

    }

    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {/*header*/}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add A New Pet 🐾</Text>
                </View>

                {/* Img*/}
                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
                        {!img ? <Image
                            style={styles.profileImage}
                            source={require('../../assets/images/default-avatar-icon.jpg')}
                        /> :
                            <Image
                                style={styles.profileImage}
                                source={{uri:img}}
                            />
                        }
                        <View style={styles.cameraIconContainer}>
                            <Text>📷</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                {/* form */}
                <View style={styles.formContainer}>
                    {/* Pet Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Pet Name</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="paw-outline" size={20} color={Colors.darkGrey} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Enter pet name"
                                placeholderTextColor={Colors.lightGray}
                                style={styles.input}
                                value={petName}
                                onChangeText={setPetName}
                            />
                        </View>
                    </View>

                    {/* category */}
                    <View style={styles.inputGroup}>
                        <TouchableOpacity
                            onPress={() => isCategoryPickerVisible ? setCategoryPickerVisible(false) : setCategoryPickerVisible(true)}
                        >
                            <Text style={styles.label}>Pet Category</Text>
                            <View style={styles.pickerInside}>
                                <Ionicons name="list-outline" size={20} color={Colors.darkGrey} />
                                <Text style={{fontFamily: 'outfit', color:Colors.lightGray,fontSize:16}}>{category || "Select a category"}</Text>
                            </View>
                        </TouchableOpacity>
                        {/* show the categories when open */}
                        {isCategoryPickerVisible && (
                            <Picker
                                selectedValue={category}
                                onValueChange={(itemValue) => {
                                    setCategory(itemValue);
                                    setCategoryPickerVisible(false);
                                }}
                                style={{backgroundColor:Colors.darkPurple, borderRadius:10}}
                            >
                                <Picker.Item label="Select a category" value="" />
                                {categories.map((category) => (
                                    <Picker.Item key={category.name} label={category.name} value={category.name} />
                                ))}
                            </Picker>
                        )}
                    </View>

                    {/*breed*/}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Breed</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="document-text-outline" size={20} color={Colors.darkGrey} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Enter breed"
                                style={styles.input}
                                value={breed}
                                onChangeText={setBreed}
                            />
                        </View>
                    </View>

                    {/*age and gender in a row*/}
                    <View style={styles.rowContainer}>
                        {/* age*/}
                        <View style={styles.halfInputGroup}>
                            <Text style={styles.label}>Age (in Years)</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholderTextColor={Colors.lightGray}
                                    placeholder="Age"
                                    style={styles.input}
                                    value={age}
                                    onChangeText={setAge}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* gender */}
                        <View style={styles.halfInputGroup}>
                            <TouchableOpacity
                                style={styles.inputGroup}
                                onPress={() => isGenderPickerVisible? setGenderPickerVisible(false) : setGenderPickerVisible(true)}
                            >
                                <Text style={styles.label}>Gender</Text>
                                <View style={styles.pickerInside}>
                                    <Text style={{fontFamily: 'outfit', color:Colors.lightGray,fontSize:16}}>{gender || "Select gender"}</Text>
                                </View>
                            </TouchableOpacity>
                            {isGenderPickerVisible && (
                                <Picker
                                    selectedValue={gender}
                                    onValueChange={(itemValue) => {
                                        setGender(itemValue);
                                        setGenderPickerVisible(false);
                                    }}
                                    style={{backgroundColor:Colors.darkPurple, borderRadius:10}}
                                >
                                    <Picker.Item label="Select a category" value="" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            )}
                        </View>
                    </View>

                    {/* weight */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Weight (in Kg)</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="scale-outline" size={20} color={Colors.darkGrey} style={styles.inputIcon} />
                            <TextInput
                                placeholderTextColor={Colors.lightGray}
                                placeholder="Enter weight"
                                style={styles.input}
                                value={weight}
                                onChangeText={setWeight}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    {/* About */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>About</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholderTextColor={Colors.lightGray}
                                placeholder="Tell us about your pet..."
                                style={[styles.input, styles.aboutInput]}
                                multiline
                                numberOfLines={4}
                                value={about}
                                onChangeText={setAbout}
                            />
                        </View>
                    </View>

                    {/* button*/}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSavePet}>
                        <Text style={styles.saveButtonText}>Save Pet</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginBottom: 20,
    },

    headerText: {
        fontFamily: 'outfit-bold',
        color: Colors.darkGrey,
        fontSize: 28,
        marginLeft: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imageUploadContainer: {
        position: 'relative',
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 70,
        borderWidth: 3,
        borderColor: Colors.darkPurple,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.darkPurple,
        borderRadius: 20,
        padding: 5,
    },


    //Form
    formContainer: {
        paddingHorizontal: 25,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontFamily: 'outfit',
        fontSize: 16,
        color: Colors.darkGrey,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 10,
    },
    input: {
        flex: 1,
        padding: 12,
        fontFamily: 'outfit',
        fontSize: 16,
        color: Colors.darkGrey,
    },
    aboutInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 12,
    },

    pickerInside: {
        justifyContent: 'flex-start',
        gap:30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.white,
    },


    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    halfInputGroup: {
        width: '48%',
    },
    saveButton: {
        height:50,
        width:Dimensions.get("screen").width*0.9,
        marginTop: 4,
        borderRadius: 10,
        backgroundColor:Colors.darkPurple,
        alignItems:"center"
    },

    saveButtonText: {
        marginTop:10,
        color: Colors.white,
        fontFamily: 'outfit-bold',
        fontSize: 18,

    },
});