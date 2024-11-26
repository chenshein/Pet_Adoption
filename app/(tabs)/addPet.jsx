import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput} from 'react-native';
import Colors from "../../assets/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

export default function AddPet(){
    return (
        <View style={styles.container}>
            {/*Header*/}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Icon name="arrow-back" size={30} color='#C400FF' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Add A New Pet</Text>
            </View>

            <View style={{alignItems:'center'}}>
                <Image style={styles.inputImg} source={require('../../assets/images/default-avatar-icon.jpg')}></Image>
            </View>

            <View style={styles.inputContainer}>
                <Text style={{fontFamily: 'outfit', }}>Pet Name *</Text>
                <TextInput style={styles.input}/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginLeft:20,
        marginBottom: 15,
        height: 70,
        gap:60,
    },
    backButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f8f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText:{
        fontFamily: 'outfit-bold',
        color:Colors.darkGrey,
        fontSize:28
    },
    inputImg:{
        height:100,
        width:100,
        borderRadius:50,
        borderWidth:1,
        borderColor:Colors.lightGray
    },
    inputContainer:{
        marginVertical:5
    },
    input:{
        padding:10,
        borderRadius:15,
        backgroundColor:'#f8f2f2',
        fontFamily: 'outfit'
    },


});

