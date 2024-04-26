import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';


export default function Kentat() {
    return (
        <View style={styles.container}>

           
           
           {/**                        
            <Image style={{ 
                width: '95%', 
                height: 230, 
                backgroundColor: 'black' }}
                resizeMode="contain"
                source={require('../kentta/kentta.png')} />
 */}
            <Image style={{ 
                width: '95%', 
                height: 230,  
            }}
                resizeMode="contain"
                source={require('../kentta/kentta.jpg')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
