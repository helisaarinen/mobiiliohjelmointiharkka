import { StatusBar } from 'expo-status-bar';
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    ScrollView,
    FlatList
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
import { harkkaData } from './Supabase';
import { createClient } from '@supabase/supabase-js';
import styles from '../style/styles';

//npx expo install react-native-maps
//npx expo install expo-location
//https://oblador.github.io/react-native-vector-icons/

const supabaseUrl = 'https://ulpvgmbqdveehyrvivgk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscHZnbWJxZHZlZWh5cnZpdmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNDQ1MjUsImV4cCI6MjAyOTYyMDUyNX0.8cNZ71vUtVvprbLOyDt-C4kmYQnQxpzxyRVy-O-zgK0'
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Ohjeet({ navigation, route }) {

    
    useEffect(() => {
        if (route.params && route.params.openAccordion) {
          handlePress(2); // Avaa "Kentät" -accordion, jos openAccordion on true
        }
      }, [route.params]);


    async function uploadFile(file) {
        try {
            const { data, error } = await supabase.storage
                .from('saannot')
                .upload('Saannot.pdf', file);

            if (error) {
                console.error('Error uploading file:', error.message);
            } else {
               // console.log('File uploaded successfully:', data);
                const fileURL = data.url;
            }
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    }

    const [turnaus, setTurnaus] = useState([]);
    const [hinnasto, setHinnasto] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await harkkaData();

                if (data && data.turnaukset && data.turnaukset.length > 0) {
                    const ekaturnaus = data.turnaukset[0];
                    setTurnaus(ekaturnaus);
                  //  console.log('fetch turnaus: ', ekaturnaus);
                }

                if (data.hinnasto && data.tuotetyypit) {
                    const hinnastotuotetyypit = data.hinnasto.map(hinnasto => {
                        const tuotetyyppi = data.tuotetyypit.find(tuotetyyppi => tuotetyyppi.tuotetyyppi_id === hinnasto.tuotetyyppi_id)?.tuotetyyppi;
                        return { ...hinnasto };
                    });
                    setHinnasto(hinnastotuotetyypit);
                    //console.log('Hinnastofetch: ', hinnastotuotetyypit);
                } else {
                    console.error('Ei turnaustietoja saatavilla tai turnaustiedot ovat tyhjiä.');
                }
            } catch (error) {
                console.error('Virhe haettaessa dataa:', error.message);
            }
        }

        fetchData();
    }, []);


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

    // YHTEYSTIEDOT
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

        // const [haku, setHaku] = useState('');

        return (
            <View >
                <View style={styles.openedPage}>

                    <Text style={styles.header}>{turnaus.paikka}</Text>

                    <View style={{ flexDirection: 'row' }}>

                        <View>
                            <Text style={styles.tekstisisalto}>{turnaus.osoite1}</Text>
                            <Text style={styles.tekstisisalto}>{turnaus.osoite2}</Text>
                        </View>

                        <View>
                            <Icon
                                reverse
                                name='location-pin'
                                type='MaterialIcon'
                                color='blue'
                                size={40}
                                containerStyle=''
                                raised=''
                                onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${turnaus.osoite1}`)}
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
                    <Text style={styles.tekstisisalto}>{turnaus.yhteyshenkiloEtunimi} {turnaus.yhteyshenkiloSukunimi}</Text>

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
                        <Text onPress={handlePhoneCall}>{turnaus.puh} </Text>
                        {/**   <Icon.Button
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
                            */}

                        <Icon
                            reverse
                            name='phone'
                            type='MaterialIcon'
                            color='blue'
                            size={40}
                            containerStyle=''
                            raised=''
                            onPress={handlePhoneCall}
                        />

                        {/*<Button title='soita' onPress={handlePhoneCall}></Button>*/}
                    </View>
                    <Icon.Button
                        name="email"
                        size={30}
                        color="white"
                        onPress={sendEmail}
                    >{turnaus.email}</Icon.Button>

                    {/*<Text style={{ color: 'blue' }}
                        onPress={handleEmailPress}
                    >helisaarinen@hotmail.com
                        </Text>*/}

                </View>

            </View>
        )
    }

    const handleEmailPress = () => {
        Linking.openURL(`mailto:helisaarinen@hotmail.com`);
    };

    const handlePhoneCall = () => {
        Linking.openURL(`tel:+358505957812`);
    };

    const sendEmail = () => {
        const to = [turnaus.email]
        email(to, {
            cc: ['helistys82@gmail.com'],
            //cc: ['bazzy@moo.com', 'doooo@daaa.com'], // Voi olla useampikin osoite
            bcc: 'helisaarinen@hotmail.com',
            subject: turnaus.nimi,
            body: 'Kirjoita viesti tähän'
        }).catch(console.error)
    }

    // PYSÄKÖINTI
    const pysakointi = () => {
        return (
            <View >
                <View style={styles.openedPage}>
                    <Text style={styles.tekstisisalto}>Sekä Kehruukujan että Koulutien puolella on pysäköintipaikkoja. Myös koulun pysäköintialuetta voi hyödyntää.</Text>
                </View>
            </View>
        )
    }

    // KENTÄT
    const kentat = () => {
        return (

            <View>
                <View style={styles.openedPage}>
                    <Text style={styles.header}>8v8 pelit</Text>
                    <Image style={{
                        width: 280,
                        height: 140,
                       // backgroundColor: 'green'
                    }}
                        resizeMode="contain"
                        source={require('../kentta/isokentta.png')} />

                    <Text style={styles.header}>5v5 pelit</Text>
                    <Image style={{
                        width: 280,
                        height: 140,
                        //backgroundColor: 'lightblue'
                    }}
                        resizeMode="contain"
                        source={require('../kentta/pikkukentat.png')} />

                </View>
            </View>
        )
    }

    // KAHVILA
    const kahvila = () => {

        const juomat = hinnasto.filter(item => item.tuotetyyppi_id === 1);
        const suolaiset = hinnasto.filter(item => item.tuotetyyppi_id === 2);
        const makeat = hinnasto.filter(item => item.tuotetyyppi_id === 3);
      
        const Item = ({ item }) => (
            <View style={styles.item}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.tekstisisalto}>{item.tuote}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Text style={styles.tekstisisalto}>{item.hinta.toLocaleString('fi-FI')} €</Text>
                        </View>
                    </View></View>
            </View>
        )

        return (
            <View>
                <View style={styles.openedPage}>
                    <Text style={styles.tekstisisalto}>Kahvila sijaitsee huoltorakennuksen edessä.</Text>
                    <Text style={styles.header}>Maksutavat</Text>
                    <Text style={styles.tekstisisalto}>Käteinen ja MobilePay</Text>

                    <Text style={styles.header}>Hinnasto</Text>
                    <Text style={styles.h2}>Juomat</Text>
                    <FlatList
                        data={juomat}
                        renderItem={({ item }) => <Item item={item} />}
                        scrollEnabled={false}
                        keyExtractor={item => item.hinnasto_id.toString()}
                    />

                    <Text style={styles.h2}>Suolaiset</Text>
                    <FlatList
                        data={suolaiset}
                        renderItem={({ item }) => <Item item={item} />}
                        scrollEnabled={false}
                        keyExtractor={item => item.hinnasto_id.toString()}
                    />

                    <Text style={styles.h2}>Makeat</Text>
                    <FlatList
                        data={makeat}
                        renderItem={({ item }) => <Item item={item} />}
                        scrollEnabled={false}
                        keyExtractor={item => item.hinnasto_id.toString()}
                    />

                </View></View>
        )
    }

    // VESSAT
    const vessat = () => {
        return (
            <View>
                <View style={styles.openedPage}>
                    <Text style={styles.tekstisisalto}>Huoltorakennuksesta löytyy yksi yleinen vessa ja kahdessa pukuhuoneessa on myös vessat.</Text>
                </View></View>
        )
    }


    // SÄÄNNÖT
    const saannot = () => {

        const tiedosto = 'https://ulpvgmbqdveehyrvivgk.supabase.co/storage/v1/object/public/saannot/Saannot.pdf?t=2024-05-06T07%3A23%3A09.701Z';

        return (
            <View>
                <View style={styles.openedPage}>

                    <Text style={styles.header}>Pelaajamäärä</Text>
                    <Text style={styles.tekstisisalto}>5v5</Text>
                    <Text style={styles.tekstisisalto}>Maalivahti + 4 kenttäpelaajaa.</Text>
                    <Text style={styles.tekstisisalto}>Vaihtopelaajien määrää ei ole rajoitettu.</Text>

                    <Text style={styles.header}>Peliaika</Text>
                    <Text style={styles.tekstisisalto}>1 x 25 min</Text>

                    <Text style={styles.header}>Pelipallo</Text>
                    <Text style={styles.tekstisisalto}>Koko 3</Text>

                    <Text style={styles.header}>Jokeri-pelaajasääntö</Text>
                    <Text style={styles.tekstisisalto}>Joukkue saa ottaa kentälle yhden lisäpelaajan,
                        kun vastustaja johtaa vähintään viidellä (5) maalilla.</Text>
                    <Text style={styles.tekstisisalto}>Etu menetetään eron vähentyessä kahteen (2) maaliin.</Text>

                    <Text style={styles.header}>Maalipotku</Text>
                    <Text style={styles.tekstisisalto}>Maalipotku tuomitaan, kun pallo menemättä maaliin ylittää päätyrajan niin,
                        että siihen on viimeksi koskenut hyökkäävän joukkueen pelaaja.</Text>

                    <Text style={styles.tekstisisalto}>Maalipotku korvataan 6-9-vuotiaiden ottelussa <Text style={{ fontWeight: 'bold' }}>maalikuljetuksella</Text>.</Text>

                    <Text style={styles.tekstisisalto}>Pallo on pelissä, kun se on selvästi liikkunut.
                        Vastapelaajien etäisyys on vähintään 5,5 metriä ja rangaistusalueen ulkopuolella, kunnes pallo on pelissä. Kanssapelaajien etäisyyttä pallosta ei ole rajoitettu.

                        Jos pallo menee maalipotkusta suoraan omaan maaliin, maalia ei hyväksytä ja vastajoukkueelle tuomitaan kulmapotku. </Text>

                    <Text style={styles.header}>Rajaheitto</Text>
                    <Text style={styles.tekstisisalto}>Rajaheitto tuomitaan viimeksi palloa koskeneen pelaajan vastajoukkueelle, kun koko pallo ylittää sivurajan.
                    </Text>
                    <Text style={styles.tekstisisalto}>Rajaheitto korvataan 6-9-vuotiaiden ottelussa <Text style={{ fontWeight: 'bold' }}>rajakuljetuksella</Text>. Tällöin pallo asetetaan rajan päälle kohdassa, jossa pallo ylitti sivurajan. Pallo on pelissä, kun se on selvästi liikkunut. Vastapelaajien etäisyys on vähintään 5,5 metriä. Kanssapelaajien etäisyyttä pallosta ei ole rajoitettu.
                    </Text>
                    <Text style={styles.tekstisisalto}>Rajakuljetuksesta ei voi ensimmäisellä kosketuksella tehdä suoraan hyväksyttävää maalia. Pallon mennessä suoraan vastustajan maaliin seuraa maalipotku ja jos pallo menee suoraan omaan maaliin seuraa kulmapotku vastustajalle.
                    </Text>

                    <Text
                        style={{ fontSize: 16, color: 'blue' }}
                        onPress={() => Linking.openURL(`${tiedosto}`)}>Säännöt (pdf)</Text>

                </View></View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{
                paddingTop: 10,
                width: '100%',
                padding: 10,
                flex: 1,
                backfaceVisibility: 'hidden',
                //backgroundColor: 'pink',
            }}>
                <ScrollView>
                    <List.Section>
                        <List.Accordion
                            title="Yhteystiedot"
                            left={props => <List.Icon {...props} icon="email" />}
                            style={styles.listaccordion}
                            expanded={expanded[0]}
                            onPress={() => handlePress(0)}
                        >
                            {renderContent(yhteystiedot())}
                        </List.Accordion>

                        <List.Accordion
                            title="Pysäköinti"
                            style={styles.listaccordion}
                            left={props => <List.Icon {...props} icon="parking" />}
                            expanded={expanded[1]}
                            onPress={() => handlePress(1)}
                        >
                            {renderContent(pysakointi())}
                        </List.Accordion>

                        <List.Accordion
                            title="Kentät"
                            style={styles.listaccordion}
                            left={props => <List.Icon {...props} icon="soccer-field" />}
                            expanded={expanded[2]}
                            onPress={() => handlePress(2)}
                        >
                            {renderContent(kentat())}
                        </List.Accordion>

                        <List.Accordion
                            title="Kahvila"
                            style={styles.listaccordion}
                            left={props => <List.Icon {...props} icon="coffee" />}
                            expanded={expanded[3]}
                            onPress={() => handlePress(3)}
                        >
                            {renderContent(kahvila())}
                        </List.Accordion>

                        <List.Accordion
                            title="Vessat"
                            //titleStyle={{color: 'red'}}
                            style={styles.listaccordion}
                            //                            left={props => <List.Icon {...props} icon="toilet" color='blue'/>}
                            left={props => <List.Icon {...props} icon="toilet" />}
                            expanded={expanded[4]}
                            onPress={() => handlePress(4)}
                        >
                            {renderContent(vessat())}
                        </List.Accordion>

                        <List.Accordion
                            title="Säännöt ja jotain muuta tosi pitkä teksti otsikossa"
                            titleNumberOfLines={2}
                            style={styles.listaccordion}
                            left={props => <List.Icon {...props} icon="book-open-variant" />}
                            expanded={expanded[5]}
                            onPress={() => handlePress(5)}
                        >

                            {renderContent(saannot())}
                        </List.Accordion>


                    </List.Section>
                </ScrollView>
            </View>
        </View>
    );
}

