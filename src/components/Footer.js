import { StyleSheet, View, Text } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer({ navigation }) {
    return(
        <View style={styles.footer}>
            <Icon 
            name='home'
            size= {30}
            color= "#463C33"
            onPress= {()  => navigation.navigate('Home')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9CBFDF', 
        zIndex: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,   
    },
    text: {
        fontSize: 18,
        fontWeight: '900'
    }
})