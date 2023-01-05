import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home ({ navigation, GlobalState }) {
    const {habitList, setHabitList, habit, setHabit, setChosenHabit} = GlobalState;

    useEffect(() => {
        setHabitList(prevState => [...prevState, {id: 2, habit: 'excercise'}])
    }, [])

    const handleSaveHabit = () => {
        const index = habitList.length + 1;

        setHabitList(prevState => [...prevState, {id: index, habit: habit}]);

        setHabit('');
    }
    const handleChooseHabit = (item) => {
        setChosenHabit(item);
        navigation.navigate('ChosenHabit');
    }
    return (
        <View style={styles.screen}>

        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F3F3F4',
        alignItems: 'center',
        justifyContent: 'Center'
    }
})