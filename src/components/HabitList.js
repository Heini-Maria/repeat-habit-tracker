import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChosenHabit from "../screens/ChosenHabit";

export default function HabitList({ navigation, GlobalState }) {
  const { habitList, setHabitList, setChosenHabit } = GlobalState;
  const dateCheck = (habitList) => {
    for (let i = 0; i < habitList.length; i++) {
      const value = habitList[i];
      let created = value.created;
      const rightNow = Date.now();
      const oneDay = created + 1000 * 60 * 60 * 24;
      const oneWeek = created + 1000 * 60 * 60 * 24 * 7;
      const oneMonth = created + 1000 * 60 * 60 * 24 * 30;
      if (value.frequency === 'day' && rightNow > oneDay || value.frequency === 'week' && created > oneWeek || value.frequency === 'month' && created > oneMonth) {
        if (value.completed === false) {
          value.completedCount = 0;
        }
        value.created= Date.now();
        value.times = 0;
        value.completed =false;
        setHabitList([...habitList]);
      }
      AsyncStorage.setItem("habits", JSON.stringify(habitList));
    }
  };

  useEffect(() => {
    dateCheck(habitList);
  }, [dateCheck, habitList]);

  const handleDelete = (item) => {
    const index = habitList.indexOf(item);
    habitList.splice(index, 1);
    const newHabits = [...habitList];
    AsyncStorage.setItem('habits', JSON.stringify(newHabits)).then(() => {
      setHabitList(newHabits);
    });
  };

  const handleCheck = (item) => {
    const goal = parseInt(item.goal, 10);
    const times = parseInt(item.times, 10);
    const complete = parseInt(item.goal, 10) - 1;
    if (times === complete) {
      item.completed = true;
      item.completedCount += 1;
      item.times += 1;
      setHabitList([...habitList]);
    }
    else if (times < goal) {
      item.completed = false;
      item.times += 1;
      setHabitList([...habitList]);
    }
    AsyncStorage.setItem('habits', JSON.stringify(habitList));
  };

  const handleChooseHabit = (item) => {
    setChosenHabit(item);
    navigation.navigate('ChosenHabit');
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.habit}>
        <TouchableOpacity
          testId="Habit"
          onPress={() => handleChooseHabit(item)}
        >
          <Text style={styles.habitText}>
            {item.habit}
          </Text>
            {item.completed ? 
              <Text style={styles.completed}>Completed</Text>
              : <Text style ={styles.habitGoal}>{item.times} / {item.goal} per {item.frequency}</Text>}
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.check} onPress={() => handleCheck(item)}>
            <FontAwesome name="check" color={'#ABC270'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <FontAwesome name="trash" color={'#463C33'} size={25}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={habitList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  habitText: {
    fontFamily: 'Amaranth',
    fontSize: 18,
    color: '#463C33',
  },
  habitGoal: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#463C33',
    marginTop: 5,
  },
  completed: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#FDA769',
    marginTop: 5,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  check: {
    marginRight: 20,
  },
  button: {
    backgroundColor: '#FDA769',
    height: 50,
    width: 50,
    marginRight: 40,
    padding: 15,
    borderRadius: '50%',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
