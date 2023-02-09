import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Constants from 'expo-constants';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require('../../assets/Images/logo.png')}/>
      <Text style={styles.text}>Repeat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#9CBFDF',
    paddingTop: Constants.StatusBarHeight,
    paddingBottom: 10,
    zIndex: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 30,
    fontFamily: 'Shrikhand',
    color: '#463C33',
    marginTop: 10,
    position: 'relative',
    left: '90%',
  },
  logo: {
    marginTop: 100,
    width: 35,
    height: 35,
    marginLeft: 36,
  },
});
