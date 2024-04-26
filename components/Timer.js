import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState, useEffect } from "react";

export default function Timer({ targetDate }) {
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

    return (
        <View style={{alignItems:'center'}}>

            <Text style={{ fontWeight:'bold',fontSize:20}}>Turnauksen alkuun:</Text>
        <View style={{
            flexDirection: 'row',
            //backgroundColor: 'pink',
            borderRadius: 10,
            width: 320,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5
        }}>

            <View style={styles.timerBox}>
                <Text style={styles.timerTime}>{timeLeft.days}</Text>
                <Text style={styles.timerUnit}>PÄIVÄÄ</Text>
            </View>
            <View style={styles.timerBox}>
                <Text style={styles.timerTime}>{timeLeft.hours}</Text>
                <Text style={styles.timerUnit}>TUNTIA</Text>
            </View>
            <View style={styles.timerBox}>
                <Text style={styles.timerTime}>{timeLeft.minutes}</Text>
                <Text style={styles.timerUnit}>MINUUTTIA</Text>
            </View>
            <View style={styles.timerBox}>
                <Text style={styles.timerTime}>{timeLeft.seconds}</Text>
                <Text style={styles.timerUnit}>SEKUNTIA</Text>
            </View>
        </View>

        </View>

        /**         
                <View style={{ width: 300, backgroundColor: 'green', alignItems: 'center' }}>
                <View>
              <Text style={styles.timer}>{timeLeft.days} päivää</Text>
              <Text  style={styles.timer}>Tunteja: {timeLeft.hours}</Text>
              <Text style={styles.timer}>Minuutteja: {timeLeft.minutes}</Text>
              <Text style={styles.timer}>Sekunteja: {timeLeft.seconds}</Text>
            </View>
        
                    <Text style={{
                        color: 'white',
                        fontSize: 25,
                        alignItems: 'center',
                        fontWeight: 'bold'
                    }}>Turnauksen alkuun:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.timer}>{timeLeft.days}</Text>
                        <Text style={styles.timer}>{timeLeft.hours}</Text>
                        <Text style={styles.timer}>{timeLeft.minutes}</Text>
                        <Text style={styles.timer}>{timeLeft.seconds}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.unit}>päivää</Text>
                        <Text style={styles.unit}>tuntia</Text>
                        <Text style={styles.unit}>minuuttia</Text>
                        <Text style={styles.unit}>sekuntia</Text>
        
        
                    </View>
                </View>*/
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'mediumturquoise',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        backgroundColor: '#266BB1',
        backgroundColor: 'red',
        fontSize: 30,
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        width: '23%'
    },

    unit: {
        backgroundColor: '#266BB1',
        fontSize: 10,
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        width: '24%',
    },
    timerBox: {
        alignItems: 'center',
        //backgroundColor:'purple'
    },
    timerTime: {
        fontSize: 25,
        marginVertical: 1,
        color:'green'
    },
    timerUnit: {
        fontSize: 14,
        color: 'gray',
        //marginBottom:1
    },
});

