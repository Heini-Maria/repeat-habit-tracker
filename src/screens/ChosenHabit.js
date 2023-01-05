import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ChosenHabit ({ navigation, GlobalState }) {
    const { chosenHabit } = GlobalState;

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
                <Text>{chosenHabit.habit}</Text>
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 8,
        width: '100%',
        backgroundColor: '#F3F3F4',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
})