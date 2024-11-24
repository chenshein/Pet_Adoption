import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import {db} from '../config/FirebaseConfig';
import Colors from "../assets/Colors";

export default function Slider() {
    const [slidersList , setSlidersList] = useState([])
    const [currentIndexSlider, setCurrentIndexSlider] = useState(0);


    useEffect(() => {
        getSliders();
    }, );

    async function getSliders() {
        try {
            const querySnapshot = await db.collection("Sliders").get();
            const sliders = [];
            querySnapshot.forEach((doc) => {
                sliders.push(doc.data());
            });
            setSlidersList(sliders);
        } catch (error) {
            console.error("Error accessing Firestore:", error);
        }
    }


    const onScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / Dimensions.get('window').width);
        setCurrentIndexSlider(index);
    };

    const renderDots = () => {
        return slidersList.map((_, index) => (
            <View
                key={index}
                style={[
                    styles.dot,
                    index === currentIndexSlider && styles.activeDot,
                ]}
            />
        ));
    };

    return (
        <View>
            <FlatList data={slidersList}
                      horizontal={true}
                      onScroll={onScroll}
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item})=>(
                <View>
                    <Image source={{uri: item.imgURL}} style={styles.sliderImg}></Image>
                </View>
            )}>
            </FlatList>

            <View style={styles.dotsContainer}>{renderDots()}</View>

        </View>
    );
}

const styles = StyleSheet.create({
    sliderImg:{
        width:Dimensions.get('screen').width,
        height: 160,
        borderRadius:20,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10, // Space between the image and the dots
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#D3D3D3',
    },
    activeDot: {
        backgroundColor: Colors.darkBlue,
    },
})
