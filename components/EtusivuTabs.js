import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useFonts } from 'expo-font';
import { useState, useEffect } from "react";
import Timer from './Timer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import Timer from './Timer';
//import * as SplashScreen from 'expo-splash-screen';
import styles from '../style/styles';

export default function Etusivu({ navigation }) {
    const Stack = createNativeStackNavigator();
    const [modalVisible, setModalVisible] = useState(false);

    const handleImagePress = () => {
        setModalVisible(true);

      //  console.log('Kuvaa painettu!');
    };


    const handlePress = () => {
        navigation.navigate('Ohjeet', { openAccordion: true }); // Välitä parametri avata "Kentät" -accordion
    };


    const targetDate = new Date('2024-05-30T17:59:59');

    return (
        <View style={styles.container}>
            <View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'yellow', alignItems: 'center', borderRadius: 10, marginTop: 5 }}>
                        <Timer targetDate={targetDate}></Timer>
                    </View>

                    <View>
                        <View>

                            <Text style={styles.frontpagetextbuttons}
                                onPress={() => navigation.navigate('Ottelut')}>OTTELUT</Text>

                            <Text style={styles.frontpagetextbuttons}
                                onPress={() => navigation.navigate('Joukkueet')}>JOUKKUEET</Text>

{/**                             <Text style={styles.frontpagetextbuttons}
                                onPress={() => navigation.navigate('Suosikit')}>SUOSIKIT</Text>
*/}
                            <Text style={styles.frontpagetextbuttons}
                                onPress={() => navigation.navigate('Tulokset')}>TULOKSET</Text>

                            <Text style={styles.frontpagetextbuttons}
                                onPress={handlePress}>KENTÄT</Text>

                            <Text style={styles.frontpagetextbuttons}
                                onPress={() => navigation.navigate('Ohjeet')}>OHJEET</Text>

                        </View>

                        <View>
                            <TouchableOpacity onPress={handleImagePress}>
                                <Image

                                    style={{
                                        width: '100%',
                                        height: 120,
                                        borderRadius: 10,
                                        marginTop: 5
                                    }}
                                    source={require('../sponsorit/Nakkikioski.jpg')}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 2, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ihk1956/')}>
                            <WebView
                                source={{ uri: 'https://www.instagram.com/ihk1956/' }}
                                style={{ height: 300, width: '100%' }}></WebView>
                                </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { setModalVisible(!modalVisible) }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <Text style={styles.header}>Tervetuloa Nakkikioskille</Text>
                            <Text style={styles.tekstisisalto}>Etukoodisi on plaaplaaplaa</Text>
                            <Text style={styles.h2}>Tutustu ruokalistaan:</Text>
                            <Text
                                onPress={() => Linking.openURL('http://www.google.com')}
                                style={[styles.tekstisisalto, {fontSize:20, color:'blue', paddingVertical:10}]}>www.google.com</Text>
                            <Button title="Sulje" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}
