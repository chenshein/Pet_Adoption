import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize:30,
                marginBottom:20,
                marginTop:10,
            }}>Welcome, </Text>
        </View>
    );
}

