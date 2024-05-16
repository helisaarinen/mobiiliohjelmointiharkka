import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState, useEffect } from "react";
import styles from '../style/styles';
import { harkkaData } from './Supabase';


export default function Timer({ targetDate }) {

    const [turnaus, setTurnaus] = useState([]);
    
    
    useEffect(() => {
      async function fetchData() {
  
        const data = await harkkaData();
   
          if (data && data.turnaukset && data.turnaukset.length > 0) {
            const ekaturnaus = data.turnaukset[0];
            setTurnaus(ekaturnaus);
            console.log('fetch turnaus: ', ekaturnaus);

        }
      }
        fetchData();
    }, []);

    const calculateTimeLeft = () => {
        const difference = +new Date(turnaus.alkuaika) - +new Date();
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

    const isTournamentRunning = +new Date() > +new Date(turnaus.alkuaika) && +new Date() < +new Date(turnaus.loppuaika);
    const tournamentOver = +new Date() > +new Date(turnaus.loppuaika);

    return (
      <View style={{ alignItems: 'center' }}>
      {isTournamentRunning && !tournamentOver ? (
          <Text style={{ fontWeight: 'bold', fontSize: 30, paddingHorizontal: 5, maxWidth: 320, marginVertical: 10, textAlign: 'center' }}>
              {turnaus.nimi} <Text style={{ fontSize: 20, paddingStart: 15 }}>käynnissä nyt</Text>
          </Text>
      ) : tournamentOver ? (
          <Text style={{ fontWeight: 'bold', fontSize: 30, paddingHorizontal: 5, maxWidth: 320, marginVertical: 10, textAlign: 'center' }}>
              Turnaus on päättynyt
          </Text>
      ) : (
          <>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Turnauksen alkuun:</Text>
              <View style={{
                  flexDirection: 'row',
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
          </>
      )}
  </View>
    );
}
