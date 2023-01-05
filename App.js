import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import registerNNPushToken from 'native-notify';

import Home from './src/screens/Home';
import ChosenHabit from './src/screens/ChosenHabit';

const Stack = createNativeStackNavigator();


export default function App() {
  //push notifications
  registerNNPushToken(5638, 'RspELd7m7YAUK1aICdo8W4');

  // globalstate management
  const [habitList, setHabitList] = useState([{id: 1, habit: 'meditate'}]);
  const [habit, setHabit] = useState('');
  const [chosenHabit, setChosenHabit] = useState('');

  const GlobalState = {
    habitList, setHabitList,
    habit, setHabit,
    chosenHabit, setChosenHabit
  }

  //navigation

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options= {{headerShown: false}} >
          {props => <Home {...props} GlobalState = {GlobalState} />}
        </Stack.Screen>
        <Stack.Screen name="ChosenHabit" options= {{headerShown: false}} >
          {props => <ChosenHabit {...props} GlobalState = {GlobalState} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


