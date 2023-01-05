import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Switch} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home ({ navigation, GlobalState }) {
    const {habitList, setHabitList, habit, setHabit, setChosenHabit, goal, setGoal} = GlobalState;
    const goals = ['1', '2', '3'];
    const dropdownRef = useRef();

/*     useEffect(() => {
        setHabitList(prevState => [...prevState, {habitList}])
    }, []) */

    const renderItem = ({ item}) => {
        return (
        <TouchableOpacity
            style={styles.habit}
            onPress={() => handleChooseHabit(item)}
        >
            <Text>{item.habit} {item.times} / {item.goal}</Text>
        </TouchableOpacity>
        )
    }

    const handleSaveHabit = () => {
        const index = habitList.length + 1;
        if(habit !== '' && goal !== '') {
        setHabitList(prevState => [...prevState, {id: index, habit: habit, times: 0, goal: goal, completed: false}]);
        setHabit('');
        setGoal('');
        dropdownRef.current.reset();
        console.log(habitList);
    } else {
        alert('name the habit and set your goal');
    }
    }
    
    const handleChooseHabit = (item) => {
        setChosenHabit(item);
        navigation.navigate('ChosenHabit');
    }

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.inputs} >
            <TextInput
                    style={styles.input}
                    onChangeText={setHabit}
                    value={habit}
                    placeholder= "habit to add..."
                />
                <SelectDropdown
                    data= {goals}
                    ref= {dropdownRef}
                    defaultButtonText= {'select goal'}
                    buttonTextStyle ={styles.dropdownText}
                    buttonStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setGoal(selectedItem);
                    }}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#463C33'} size={12} />;
                      }}
                />
            </View>
            <View style={styles.body}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveHabit}
                >
                    <Text style={styles.buttonText}>+ Add Habit</Text>
                </TouchableOpacity>
                <FlatList 
                    data={habitList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 8.5,
        width: '100%',
        backgroundColor: '#F3F3F4',
    },
    habit: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 12,
    },
    inputs: {
        flex: 1.5,
        width: '100%',
        backgroundColor: '#F3F3F4',
        padding: 15,
        alignItems: 'flex-start',
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 15,
        height: '3%',
        width: '90%',
        borderRadius: 12,
    },
    dropdown: {
        flex: 1,
        backgroundColor: 'white',
        heigth: '3%',
        width: '30%',
        padding: 15,
        borderRadius: 12,
    },
    dropdownText: {
        color: '#463C33',
        fontSize: 12,
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#463C33',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10,
        marginBottom: 30,
        borderRadius: 12,
        alignItems: 'center',
        border: '1px solid red',
    },
    buttonText: {
        color: 'white'
    }

  
})