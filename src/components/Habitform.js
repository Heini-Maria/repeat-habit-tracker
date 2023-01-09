import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Switch, Image} from 'react-native';
import Modal from 'react-native-modal';
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Habitform ({ GlobalState, isVisible, setIsVisible }) {
    const {habitList, setHabitList, habit, setHabit, goal, setGoal, frequency, setFrequency,} = GlobalState;
    const goals = ['1', '2', '3', '4', '5', '6', '7'];
    const per = ['day', 'week', 'month']
    const dropdownRef = useRef();
    const [habitError, setHabitError] = useState('');
   
    const handleChange = (input) => {
        setHabit(input);
        setHabitError('');
    }

    const handleSaveHabit = () => {
        const index = habitList.length + 1;
        const regex = /^[a-zA-z]+$/;
        let isValid = regex.test(habit)
        console.warn(isValid);
        
        if(isValid && habit !== '' && goal !== '' && frequency !== '') {
        setHabitList(prevState => [...prevState, {id: index, habit: habit, times: 0, goal: goal, frequency: frequency, completed: false}]);
        setHabit('');
        setGoal('');
        setFrequency('')
        dropdownRef.current.reset();
        setIsVisible(!isVisible);
        setHabitError('');
        console.log(habitList);
    } else if (habit === '' && goal === ''){
        setIsVisible(!isVisible);
    } else if (habit !== '' && !isValid) {
        setHabitError('Habit should contain only letters!');
    } else {
        setHabitError('Please fill all fields below');
    }
    }

    return (
           <View style={styles.inputs}  >
                <Modal isVisible={isVisible}
                      style={styles.modal}  >
                <Text style={styles.error}>{habitError}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange}
                    value={habit}
                    keyboardType= 'email-address'
                    placeholder= "habit to add..."
                    maxLength={20}
                />
                <SelectDropdown
                    data= {goals}
                    ref= {dropdownRef}
                    defaultButtonText= {'select # of times'}
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
                <SelectDropdown
                    data= {per}
                    ref= {dropdownRef}
                    defaultButtonText= {'select timeframe'}
                    buttonTextStyle ={styles.dropdownText}
                    buttonStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setFrequency(selectedItem);
                    }}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#463C33'} size={12} />;
                      }}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveHabit}
                >
                    <FontAwesome name= 'plus' color={'#F3F3F4'} size={20} />
                </TouchableOpacity>
                </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    inputs: {
        flex: 3,
        width: '100%',
        backgroundColor: '#F3F3F4',
        padding: 15,
        flexWrap: 'wrap',

    },
    text: {
        fontFamily: 'Inter',
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'left',
        padding: 10,
        color: '#463C33',
        backgroundColor: 'rgba(156,191,223, 0.9)'
     
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        fontSize: 16,
        width: '90%',
        borderRadius: 12,
        fontFamily: 'Amaranth',
    },
    dropdown: {
        backgroundColor: 'white',
        width: '45%',
        display: 'inline-block',
        marginTop: 10,
        padding: 15,
        borderRadius: 12,
    },
    dropdownText: {
        color: '#463C33',
        fontSize: 16,
        fontFamily: 'Amaranth',
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#FDA769',
        height: 50,
        width: 50,
        marginRight: 30,
        padding: 15,
        borderRadius: '50%',
        alignItems: 'center',
        alignSelf: 'flex-end'  
    },
    error: {
        color: 'tomato', 
        marginLeft: 10, 
        marginBottom: 5,
        fontFamily: 'Inter',
        fontSize: 18,
    }

})