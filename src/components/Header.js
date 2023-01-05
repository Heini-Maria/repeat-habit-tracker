import { StyleSheet, View, Text } from "react-native";
import Constants  from "expo-constants";

export default function Header() {
    return(
        <View style={styles.header}>
            <Text style={styles.text}>My Habit List</Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1.5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9CBFDF',
        paddingTop: Constants.StatusBarHeight ,
        zIndex: 5,   
    },
    text: {
        fontSize: 18,
        fontWeight: '900',
        color: '#463C33',
        marginTop: 20,
    }
})