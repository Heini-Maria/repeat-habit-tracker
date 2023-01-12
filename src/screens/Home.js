import React from "react"
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HabitList from "../components/HabitList";
import Habitform from "../components/Habitform";

export default function Home ({ navigation, GlobalState }) {
    const {/* habitList, setHabitList, 
        habit, setHabit, 
        chosenHabit, setChosenHabit, 
        goal, setGoal,
        frequency, setFrequency,
        completed, setCompleted, */
        isVisible, setIsVisible
    } = GlobalState;
    
    const renderForm  = () => {
        setIsVisible(!isVisible);
        return isVisible;
    }


    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
                <HabitList 
                    GlobalState={GlobalState}
                    navigation={navigation}/>
            </View>
            <Habitform 
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                GlobalState={GlobalState}/>
            <View style={styles.addHabit}>    
                <TouchableOpacity
                    style={styles.button}
                    onPress={renderForm}>
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
        flex: 16,
        width: '100%',
        paddingTop: 30,
        backgroundColor: '#F3F3F4',   
    },
    addHabit: {
        flex: 2,
        display: 'block',
        width: '100%',
        padding: 15,
        backgroundColor: '#F3F3F4',
        alignItems: "flex-end"
    },
    button: {
        backgroundColor: '#FDA769',
        height: 50,
        width: 50,
        marginRight: 40,
        padding: 15,
        borderRadius: '50%',
        alignItems: 'center',
        alignSelf: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,  
    },
})