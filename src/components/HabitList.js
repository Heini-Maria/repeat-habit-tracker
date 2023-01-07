import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ChosenHabit from "../screens/ChosenHabit";

export default function HabitList ({ navigation, GlobalState }) {
    const {habitList, setHabitList, 
        habit, setHabit, 
        chosenHabit, setChosenHabit, 
        goal, setGoal,
        frequency, setFrequency,
        isVisible, setIsVisible
    } = GlobalState;
     
    
    function handleDelete (item) {
        const index = habitList.indexOf(item);
        habitList.splice(index, 1);
        setHabitList([...habitList]);
    }
    const handleCheck = (item) => {
        if(item.times < item.goal){
        item.times += 1;
        setHabitList([...habitList]);
        } else {
            alert('Completed!')
            item.times = 0;
            setHabitList([...habitList]);
        }
        }

    const renderItem = ({ item}) => {
        
        return (
        <View style={styles.habit}>
        <TouchableOpacity
            
            onPress={() => handleChooseHabit(item)}
        >
            <Text
             style={styles.habitText}   
            >{item.habit} {item.times} / {item.goal} per {item.frequency}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCheck(item)}>
                <FontAwesome name='check' color={'#ABC270'} size={30}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item)}>
                <FontAwesome name='trash' color={'#463C33'} size={25}/>
            </TouchableOpacity>
            </View>
        )
    }

    const handleChooseHabit = (item) => {
        setChosenHabit(item);
        navigation.navigate('ChosenHabit');
    }

    return (
                <FlatList 
                    data={habitList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
           
    )
}
const styles = StyleSheet.create({
    habit: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 10,
        paddingRight: 30,
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    habitText: {
        fontFamily: 'Amaranth',
        fontSize: 16,
        color: '#463C33',
    },
    button: {
        backgroundColor: '#FDA769',
        height: 50,
        width: 50,
        marginRight: 40,
        padding: 15,
        borderRadius: '50%',
        alignItems: 'center',
        alignSelf: 'flex-start'  
    },
})