import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Slider from "../../components/slider";
import Header from "../../components/header";
import CategoriesList from "../../components/category";
import PetListByCategory from "../../components/petListByCategory";

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Slider />
            {/*<CategoriesList/>*/}
            <PetListByCategory/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
});
