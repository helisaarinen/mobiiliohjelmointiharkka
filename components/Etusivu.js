import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFonts } from 'expo-font';
import { useState, useEffect } from "react";
import Timer from './Timer';
//import Timer from './Timer';
//import * as SplashScreen from 'expo-splash-screen';

export default function Etusivu({ navigation }) {

    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const targetDate = new Date('2024-05-25T17:59:59');

    return (
        <View style={styles.container}>
            <View>
                <View style={{ backgroundColor: 'yellow', alignItems: 'center', borderRadius: 10, marginTop: 5 }}>
                    <Timer targetDate={targetDate}></Timer>
                </View>
                <Text style={styles.texts}
                    onPress={() => navigation.navigate('Ottelut')}>OTTELUT</Text>

                <Text style={styles.texts}
                    onPress={() => navigation.navigate('Joukkueet')}>JOUKKUEET</Text>

                <Text style={styles.texts}
                    onPress={() => navigation.navigate('Suosikit')}>SUOSIKIT</Text>

                <Text style={styles.texts}
                    onPress={() => navigation.navigate('Tulokset')}>TULOKSET</Text>

                <Text style={styles.texts}
                    onPress={() => navigation.navigate('Kentät')}>KENTÄT</Text>

                <Text style={styles.texts}
                    onPress={() => navigation.navigate('Ohjeet')}>OHJEET</Text>

            </View>

            <View style={{ flex: 2, marginTop: 5 }}>
                <WebView
                    source={{ uri: 'https://www.instagram.com/ihk1956/' }}
                    style={{ flex: 1, width: 320 }}></WebView>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'mediumturquoise',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 1,
        margin: 1,
        width: 300,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    texts: {
        backgroundColor: '#266BB1',
        padding: 10,
        fontSize: 30,
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        marginTop: 5,
        width: 320,
        fontSize: 24,
        /*
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Varjostuksen väri
        textShadowOffset: { width: 2, height: 2 }, // Varjostuksen siirtymä
        textShadowRadius: 5 // Varjostuksen säde
        */
    },
    otsikot: {
        flex: 3,
        alignItems: 'flex-start',
        marginTop: 10,
        backgroundColor: 'lightgrey',
        /*            shadowColor: 'red', // Varjostuksen väri
                    shadowOffset: { width: 2, height: 2 }, // Varjostuksen siirtymä
                    shadowOpacity: 0.8, // Varjostuksen peittävyys
                    shadowRadius: 4, // Varjostuksen säde
                    elevation: 5, // Elevation tarvitaan Androidilla,
                  */
    },
    timer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 250,
        backgroundColor: 'green',
        borderRadius: 10,

    },
    timerUnit: {
        backgroundColor: 'purple',
        fontSize: 10,
        width: '22%'
        //justifyContent: 'center', //vaakasuunnassa keskitys
        //alignItems:'center',

    },
    timerTime: {
        fontSize: 25,
        backgroundColor: 'blue',
        width: '25%'
        //        marginHorizontal:5,
        //alignItems:'center',
        //justifyContent: 'center', //vaakasuunnassa keskitys

    }

});
