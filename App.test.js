
import 'react-native';
import React from 'react';
import App from './App';
import  Home  from './src/screens/Home';
import AsyncStorage from "@react-native-async-storage/async-storage";

import ChosenHabit from './src/screens/ChosenHabit';
import {create, renderer, shallow} from 'react-test-renderer';
import Habitform from './src/components/Habitform';
import HabitList from './src/components/HabitList';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

jest.runAllTimers();


describe('test for App', () => {
test('Test Rendering', () => {
    const tree = create(<App />)
    expect(tree).toMatchSnapshot();
})
})
describe('test for Header', () => {
    test('Test Rendering', () => {
        const header = create(<Header/>)
        expect(header).toMatchSnapshot();
    })
})
describe('test for Footer', () => {
    test('Test Rendering', () => {
        const footer = create(<Footer/>)
        expect(footer).toMatchSnapshot();
    })
})

describe('test for Footers Home icon', () => {
    const navigation = {
        navigate: jest.fn()
    }
    const tree = create(<Footer navigation={navigation} />)
    test('navigate to home', () => {
        
        const button = tree.root.findByProps({testID: 'home'}).props;
        button.onPress();
        expect(navigation.navigate).toBeCalledWith('Home');
    })
})
