import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import {db} from '../config/FirebaseConfig';

export default function Slider() {
    const [slidersList , setSlidersList] = useState([])

    useEffect(() => {
        getSliders();
    }, []);

    async function getSliders() {
        try {
            const querySnapshot = await db.collection("Sliders").get();
            const sliders = [];
            querySnapshot.forEach((doc) => {
                sliders.push(doc.data());
            });
            setSlidersList(sliders);
            console.log("Firestore read operation successful.");
        } catch (error) {
            console.error("Error accessing Firestore:", error);
        }
    }

    return (
        <View>
            <FlatList data={slidersList}
                      horizontal={true}
                      renderItem={({item,index})=>(
                <View>
                    <Image source={item.imgURL} style={styles.sliderImg}></Image>
                </View>
            )}>

            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    sliderImg:{
        width:Dimensions.get('screen').width * 0.9,
        height: 160
    }
})
