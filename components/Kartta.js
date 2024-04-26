import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Alert, StyleSheet, View, Text, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Kartta({navigation}) {

  const API_KEY = process.env.EPXP_PUBLIC_API_KEY;

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
        longitude: parseFloat(location.coords.longitude) })
      console.log(location);
    })();
  }, []);

  const [haku, setHaku] = useState('');

  //API KEY: 65ce3d504f234231924774xgm8d797c

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

  return (
    <View style={styles.container}>
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //Muut tyylit pois, ettei sotke karttaa.
    //backgroundColor: 'lightyellow',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  mapstyle: {
    width: '100%',
    height: '100%'

  }
});
