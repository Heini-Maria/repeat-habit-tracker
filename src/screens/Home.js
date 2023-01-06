import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Switch, Image} from 'react-native';
import Modal from 'react-native-modal';
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import Header from '../components/Header';
import Footer from '../components/Footer';
import ChosenHabit from "./ChosenHabit";

export default function Home ({ navigation, GlobalState }) {
    const {habitList, setHabitList, habit, setHabit, chosenHabit, setChosenHabit, goal, setGoal} = GlobalState;
    const goals = ['1', '2', '3'];
    const dropdownRef = useRef();
    const [isVisible, setIsVisible] = useState(false);

    
    
    function handleDelete (item) {
        const index = habitList.indexOf(item);
        habitList.splice(index, 1);
        setHabitList([...habitList]);
    }
    const handleCheck = (item) => {
        item.times += 1;
        setHabitList([...habitList]);
        }

    const renderItem = ({ item}) => {
        
        return (
        <View style={styles.habit}>
        <TouchableOpacity
            
            onPress={() => handleChooseHabit(item)}
        >
            <Text
             style={styles.habitText}   
            >{item.habit} {item.times} / {item.goal}</Text>
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

    const renderForm  = () => {
        setIsVisible(!isVisible);
    }
        


    const handleSaveHabit = () => {
        const index = habitList.length + 1;
        if(habit !== '' && goal !== '') {
        setHabitList(prevState => [...prevState, {id: index, habit: habit, times: 0, goal: goal, completed: false}]);
        setHabit('');
        setGoal('');
        dropdownRef.current.reset();
        setIsVisible(!isVisible);
        console.log(habitList);
    } else if (habit === '' && goal === ''){
        setIsVisible(!isVisible);
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
            <View style={styles.body}>
                <FlatList 
                    data={habitList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
           <View style={styles.inputs} >
                <Modal isVisible={isVisible} >        
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveHabit}
                >
                    <FontAwesome name= 'plus' color={'#F3F3F4'} size={20} />
                </TouchableOpacity>
                </Modal>
                </View> 
            <View style={styles.addHabit}>    
                <TouchableOpacity
                    style={styles.button}
                    onPress={renderForm}
                >
                    <FontAwesome name= 'plus' color={'#F3F3F4'} size={20} />
                </TouchableOpacity>
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
        flex: 7,
        width: '100%',
        paddingTop: 30,
        backgroundColor: '#F3F3F4',   
    },
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
        fontSize: 16
    },
    addHabit: {
        flex: 1,
        display: 'block',
        width: '100%',
        padding: 15,
        backgroundColor: '#F3F3F4',
        alignItems: "flex-end"
    },
    inputs: {
        flex: 3,
        width: '100%',
        backgroundColor: '#F3F3F4',
        padding: 15,
        flexWrap: 'wrap'

    },
    input: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 15,
        width: '90%',
        borderRadius: 12,
        fontFamily: 'Amaranth',
    },
    dropdown: {
        backgroundColor: 'white',
        width: '40%',
        padding: 15,
        borderRadius: 12,
    },
    dropdownText: {
        color: '#463C33',
        fontSize: 12,
        fontFamily: 'Amaranth',
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#FDA769',
        height: 50,
        width: 50,
        marginRight: 40,
        padding: 15,
        borderRadius: '50%',
        alignItems: 'center',
        alignSelf: 'flex-end'  
    },
})