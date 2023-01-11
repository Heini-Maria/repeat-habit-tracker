import { isRootedExperimentalAsync } from 'expo-device';
import 'react-native';
import React from 'react';
import {App} from './App';

import renderer from 'react-test-renderer';

test('renderForm toggle s the state isVisible', () => {
    let appData = renderer.create(<App />).getInstance();

    expect(appData.getHabitList()).toBeDefined(); 
});
