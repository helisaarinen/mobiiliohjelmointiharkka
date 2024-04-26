import { StatusBar } from 'expo-status-bar';
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    ScrollView
} from 'react-native';
import * as React from 'react';
import { List } from 'react-native-paper';
import email from 'react-native-email';
//import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Kartta from './Kartta';
import { spaceRef } from './Database';

//npx expo install react-native-maps
//npx expo install expo-location


export default function Ohjeet({navigation}) {

    const [expanded, setExpanded] = React.useState({}); 

    const handlePress = (index) => {
        setExpanded((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const renderContent = (contentText) => {
        return (
            <View>
                <Text>{contentText}</Text>
            </View>
        );
    };

    const yhteystiedot = () => {

        const [region, setRegion] = useState({
            latitude: 60.200692,
            longitude: 24.934302,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
        })

        //setRegion({ ...region, latitude: vastauksesta, longitude: vastauksesta })
        // expo location componentin asennus
        // kysy lupa 

        const [location, setLocation] = useState('');

        useEffect(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('No permission to get location')
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                setRegion({
                    ...region,
                    latitude: parseFloat(location.coords.latitude),
                    longitude: parseFloat(location.coords.longitude)
                })
                console.log(location);
            })();
        }, []);

        const [haku, setHaku] = useState('');
        return (
            <View style={{ backgroundColor: 'yellow' }}>
                <View style={styles.openedPage}>

                    <Text style={styles.header}>Itä-Hakkilan tekonurmi</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <View>
                            <Text>Kehruukuja 14, 01260 Vantaa</Text>
                            <Text>Koulutie 8, 01260 Vantaa
                            </Text>
                        </View>

                        <View>

                            <Icon
                                reverse
                                name='location-pin'
                                type='MaterialIcon'
                                color='blue'
                                size={50}
                                containerStyle=''
                                raised=''
                                onPress={() => navigation.navigate('Joukkueet')}


                            />

                        </View>
                    </View>
                    <View>
                        <MapView
                            key={`${region.latitude}-${region.longitude}`}
                            style={styles.mapstyle}
                            region={region}
                        >
                            <Marker
                                coordinate={{
                                    latitude: 60.294067,
                                    longitude: 25.107281
                                }}>
                            </Marker>

                        </MapView>
                    </View>

                    <Text style={styles.header}>Turnauksen vastuuhenkilö:</Text>
                    <Text>nimi</Text>
                    <Text>puhelinnumero</Text>

                    {/*
                    <Button
                        icon={
                            <Icon
                                name="phone"
                                size={15}
                                color="white"
                            />
                        }
                        onPress={handlePhoneCall}
                        title="Button with icon component"
                    />
            */}
                    <View style={{
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text>050 595 7812 </Text>
                        <Icon.Button
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'yellow'
                            }}
                            borderRadius={0}
                            name="phone"
                            size={30}
                            color="blue"
                            onPress={handlePhoneCall}></Icon.Button>

                        <Icon
                            reverse
                            name='phone'
                            type='MaterialIcon'
                            color='blue'
                            size={50}
                            containerStyle=''
                            raised=''
                            onPress={handlePhoneCall}
                        />

                        {/*<Button title='soita' onPress={handlePhoneCall}></Button>*/}
                    </View>
                    <Icon.Button name="email" size={30} color="white" onPress={sendEmail}>Sähköposti</Icon.Button>

                    <Text style={{ color: 'blue' }}
                        onPress={handleEmailPress}
                    >helisaarinen@hotmail.com
                    </Text>
                    <Text>Lisää kartta!</Text>

                </View>

            </View>
        )
    }

    const handleEmailPress = () => {
        //          Linking.openURL(`mailto:${email}`);
        Linking.openURL(`mailto:helisaarinen@hotmail.com`);
    };

    const handlePhoneCall = () => {
        //          Linking.openURL(`mailto:${email}`);
        Linking.openURL(`tel:+358505957812`);
    };

    const sendEmail = () => {
        const to = ['helisaarinen@hotmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            cc: ['helistys82@gmail.com'], // string or array of email addresses
            //            cc: ['bazzy@moo.com', 'doooo@daaa.com'], // Voi olla useampikin osoite
            bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'Show how to use',
            body: 'Some body right here'
            // checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch(console.error)
    }

    const kahvila = () => {
        return (
            <View style={{ backgroundColor: 'yellow' }}>
                <View style={styles.openedPage}>
                    <Text>kahvilasta saa sitä ja tätä ja maksutapana toimii 
                        kjdf kj dfkjkfd kjfkdj fkdj fkdj kfjd kfj kdj fkjdkfj dkjf kdjkf....</Text>
                    <Text style={{fontSize: 20}}>Miten tänne saa Mobilepay-linkin?</Text>



                </View></View>
        )
    }

    const kentat = () => {
        return (

            <View style={{ backgroundColor: 'yellow' }}>

                <Text>KENTÄT</Text>
                <Image style={{
                    width: 270,
                    height: 200,
                }}
                    resizeMode="contain"
                    source={require('../kentta/kentta.jpg')} />

            <Image style={{
                    width: 270,
                    height: 200,
                }}
                    resizeMode="contain"
                    source={require('../kentta/kentta.png')} />

            <Image style={{
                    width: 270,
                    height: 200,
                }}
                    resizeMode="contain"
                    source={require('../kentta/kentta.png')} />

            </View>
        )
    }



    return (
        <View style={styles.container}>
            <View style={{ width: '95%', backgroundColor: 'yellow', padding: 10, flex: 1 }}>
                <ScrollView>
                    <List.Section style={{backgroundColor:'pink'}}
                    >
                        <List.Accordion
                            title="Yhteystiedot"
                            left={props => <List.Icon {...props} icon="email" />}
                            style={styles.ohjepalkit}
                            expanded={expanded[0]} 
                            onPress={() => handlePress(0)}
                         >
                            {renderContent(yhteystiedot())}
                        </List.Accordion>

                        <List.Accordion
                            title="Pysäköinti"
                            style={styles.ohjepalkit}
                            left={props => <List.Icon {...props} icon="parking" />}
                            expanded={expanded[1]}
                            onPress={() => handlePress(1)}
                        >
                            {renderContent(kentat())}
                        </List.Accordion>

                        <List.Accordion
                            title="Kentät"
                            style={styles.ohjepalkit}
                            left={props => <List.Icon {...props} icon="soccer-field" />}
                            expanded={expanded[2]} 
                            onPress={() => handlePress(2)} 
                        >
                            {renderContent(kentat())}
                        </List.Accordion>

                        <List.Accordion
                            title="Kahvilaaaaa"
                            style={styles.ohjepalkit}
                            left={props => <List.Icon {...props} icon="coffee" />}
                            expanded={expanded[3]} 
                            onPress={() => handlePress(3)} 
                        >
                            {renderContent(kahvila())}
                        </List.Accordion>

                        <List.Accordion
                            title="Vessat"
                            titleStyle={{color: 'red'}}
                            style={styles.ohjepalkit}
                            left={props => <List.Icon {...props} icon="toilet" color='blue' />}
                            expanded={expanded[4]} 
                            onPress={() => handlePress(4)} 
                        >
                            {renderContent(kahvila())}
                        </List.Accordion>
                    </List.Section>

                </ScrollView>
            </View>
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
    ohjepalkit: {
        backgroundColor: 'lightblue',
//        marginHorizontal: 10,
        backfaceVisibility:'hidden',
        marginVertical: 1,
        borderRadius: 10,
        color: 'green',
        overflow:'hidden',
        textDecorationColor:'yellow' //MIKÄ TÄÄ ON?
    },
    
    openedPage: {
        flex: 1,
        backgroundColor: 'lightgreen',
        width: 280,
        //        justifyContent: 'center',
        // alignItems: 'center',
        //padding: 1
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        marginVertical: 10

    },
    mapstyle: {
        width: '100%',
        height: 200

    }


});
