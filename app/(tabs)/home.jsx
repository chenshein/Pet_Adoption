import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Slider from "../../components/slider";
import Header from "../../components/header";
import PetListByCategory from "../../components/petListByCategory";

export default function Home() {
    return (
        <ScrollView style={styles.container}>
            <Header />
            <Slider />
            <PetListByCategory/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:8

    },
});
