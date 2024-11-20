import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../assets/Colors';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();
    const [currentIndexSlider, setCurrentIndexSlider] = useState(0);

    const introSliderImg = [
        { id: 1, sourceImg: require('../assets/images/Slider1.png') },
        { id: 2, sourceImg: require('../assets/images/Slider2.png') },
        { id: 3, sourceImg: require('../assets/images/Slider3.png') },
    ];

    const handleLoginPress = () => {
        router.push('/loginPage');
    };

    const handleRegisterPress = () => {
        router.push('/registerPage');
    };

    // when user slide the img
    const onScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / Dimensions.get('window').width);
        setCurrentIndexSlider(index);
    };

    const renderDots = () => {
        return introSliderImg.map((_, index) => (
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
        <SafeAreaView style={styles.container}>
            <FlatList
                data={introSliderImg}
                renderItem={({item})=>(
                    <View style={styles.imgContainer}>
                        <Image
                            source={item.sourceImg}
                            style={styles.img}
                            resizeMode="contain"
                        />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                onScroll={(event) => onScroll(event)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.sliderContainer}
            />

            <View style={styles.dotsContainer}>{renderDots()}</View>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: Colors.darkPurple }]}>
                    Find a New
                </Text>
                <Text style={[styles.title, { color: Colors.primary }]}>
                    Friend For You
                </Text>
                <Text style={styles.subtitle}>
                    Meet your dream friend and create joyful memories together!
                </Text>
            </View>
            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={handleRegisterPress}
                >
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={handleLoginPress}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    sliderContainer: {
        flexGrow: 1,
        marginTop:70
    },
    imgContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: 'outfit-bold',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.lightGray,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 24,
        fontFamily: 'outfit',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 30,
        paddingHorizontal: 20,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    registerButton: {
        backgroundColor: Colors.white,
    },
    registerButtonText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: 'outfit',
    },
    loginButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    loginButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: 'outfit',
    },

    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5,
        backgroundColor: Colors.lightGray,
    },
    activeDot: {
        backgroundColor: Colors.primary,
    },
});
