import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import registerNNPushToken from 'native-notify';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Home from './src/screens/Home';
import ChosenHabit from './src/screens/ChosenHabit';


const Stack = createNativeStackNavigator();
const getFonts = () => Font.loadAsync({
    'Amaranth': require('./assets/Fonts/Amaranth/Amaranth-Regular.ttf'),
    'Anton': require('./assets/Fonts/Anton/Anton-Regular.ttf'),
    'Inter': require('./assets/Fonts/Inter/Inter-Regular.ttf'),
    'Shrikhand': require('./assets/Fonts/Shrikhand/Shrikhand-Regular.ttf')
  });


export default function App() {
  //push notifications
  registerNNPushToken(5638, 'RspELd7m7YAUK1aICdo8W4');

  // globalstate management
  const [habitList, setHabitList] = useState([{id: 1, habit: 'meditate', times: 0, goal: 3, completed: false}]);
  const [habit, setHabit] = useState('');
  const [goal, setGoal] = useState('');
  const [chosenHabit, setChosenHabit] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);


  const GlobalState = {
    habitList, setHabitList,
    habit, setHabit,
    goal, setGoal,
    chosenHabit, setChosenHabit,
    fontsLoaded, setFontsLoaded,
  }
  

  //navigation
  if(fontsLoaded) {   

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
} else {
  return (
  <AppLoading
    startAsync= {getFonts}
    onFinish={()=> setFontsLoaded(true)}
    onError={(err) => console.log(err)}
  />
  )
}
}

