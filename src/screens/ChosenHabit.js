import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TextInput } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ChosenHabit ({ navigation, GlobalState }) {
    const { chosenHabit } = GlobalState;
    const times = parseInt(chosenHabit.times);
    const goal = parseInt(chosenHabit.goal);
    const percentage = parseInt(times/goal * 100);
    

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
                <Text style={styles.habitTitle}
                >{chosenHabit.habit}</Text>
                <Text style={styles.habitText}
                >Status: {chosenHabit.times} / {chosenHabit.goal} this {chosenHabit.frequency} </Text>
                <Text style={styles.percentage}
                >{percentage} % completed</Text>
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
        flex: 11,
        width: '100%',
        paddingTop: 30,
        backgroundColor: '#F3F3F4',
        justifyContent: 'center',
        alignItems: 'center'   
    },
    habitTitle: {
        fontFamily: 'Anton',
        fontSize: 40,
        marginBottom: 30,
        color: '#463C33'
    },
    habitText: {
        fontFamily: 'Amaranth',
        fontSize: 20,
        color: '#463C33',
    },
    percentage: {
        marginTop: 20,
        fontFamily: 'Amaranth',
        fontSize: 40,
        color: '#ABC270',
    },
})