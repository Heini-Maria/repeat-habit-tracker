import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import { Rating } from 'react-native-stock-star-rating';

import Header from '../components/Header';
import Footer from '../components/Footer';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 18,
    width: '100%',
    paddingTop: 200,
    backgroundColor: '#F3F3F4',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  habitTitle: {
    fontFamily: 'Anton',
    fontSize: 40,
    marginBottom: 30,
    color: '#463C33'
  },
  habitText: {
    fontFamily: 'Amaranth',
    fontSize: 20,
    marginTop: 5,
    color: '#463C33',
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  complete: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentage: {
    marginTop: 10,
    marginLeft: 10,
    fontFamily: 'Amaranth',
    fontSize: 40,
    color: '#ABC270',
  },
});

export default function ChosenHabit({ navigation, GlobalState }) {
  const { chosenHabit } = GlobalState;
  const times = parseInt(chosenHabit.times, 10);
  const goal = parseInt(chosenHabit.goal, 10);
  const percentage = parseInt(((times / goal) * 100), 10);
  const duration = 3000;
  const max = 100;
  const animated = useRef(new Animated.Value(0)).current;
  const inputRef = useRef();
  const starCount = chosenHabit.completedCount;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 500,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }

  useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });
  }, [max]);

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.habitTitle}>
          {chosenHabit.habit}
        </Text>
        <Text style={styles.habitText}>
            Status: {chosenHabit.times} / {chosenHabit.goal} this {chosenHabit.frequency} 
        </Text>
        <View style={styles.streak}>
          <Text style={styles.habitText}>Current streak: </Text>
            {starCount > 0 ?
              (
                <Rating
                  stars={starCount}
                  maxStars={starCount > 7 ? 7 : starCount}
                  size={20}
                  color={'#FDA769'}
                />
              )
            : <Text style={styles.habitText}>0</Text>}
          {starCount > 7 ? <Text style={styles.habitText}>+{starCount -7}</Text> : null}
        </View>
        <View style={styles.complete}>
          <AnimatedInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue="0"
            style={[
              { fontSize: 40, color: '#ABC270', fontFamily: 'Amaranth' },
              { textAlign: 'left', marginTop: 10 },
            ]}
          />
          <Text style={styles.percentage}>% completed</Text>
        </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}
