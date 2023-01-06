import { StyleSheet, View, Text, Image } from "react-native";
import Constants  from "expo-constants";


export default function Header() {
    return(
        <View style={styles.header}>
            <Image style={styles.logo} source={require('../../assets/Images/logo.png')}/>
            <Text style={styles.text}>My Habit List</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1.5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flext start',
        backgroundColor: '#9CBFDF',
        paddingTop: Constants.StatusBarHeight ,
        zIndex: 5,
        flexWrap: 'wrap',
        flexDirection: 'row'   
    },
    text: {
        fontSize: 20,
        fontFamily: 'Anton',
        color: '#463C33',
        marginTop: 10,
        position: 'relative',
        left: '95%'
    },
    logo: {
        marginTop: 100,
        width: 35,
        height: 35,
        marginLeft: 36
    }
})