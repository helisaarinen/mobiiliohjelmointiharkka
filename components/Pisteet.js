import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import { harkkaData } from './Supabase';

export default function Pisteet(){

  
  const [joukkueet, setJoukkueet] = useState([]);
  const [ottelut, setOttelut] = useState([]);
  const [seurat, setSeurat] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const data = await harkkaData();
      if (data) {

        const ottelutFormatted = data.ottelut.map(ottelu => ({
          ...ottelu,
          alkuaika: ottelu.alkaa.substring(0, 5),
          loppuaika: ottelu.loppuu.substring(0, 5)
        }));

        const joukkueetMap = {};
        data.joukkueet.forEach(joukkue => {
          joukkueetMap[joukkue.joukkue_id] = joukkue.nimi;
        });

        const joukkueetLogot = data.joukkueet.map(joukkue => {
          const logo = data.seurat.find(seura => seura.seura_id === joukkue.seura_id)?.logo;
          return { ...joukkue, logo };
        });

        const ottelutJoukkuenimet = ottelutFormatted.map(ottelu => ({
          ...ottelu,
          kotijoukkue: joukkueetMap[ottelu.kotijoukkue],
          vierasjoukkue: joukkueetMap[ottelu.vierasjoukkue],
          kotilogo: joukkueetLogot.find(joukkue => joukkue.joukkue_id === ottelu.kotijoukkue)?.logo,
          vieraslogo: joukkueetLogot.find(joukkue => joukkue.joukkue_id === ottelu.vierasjoukkue)?.logo,
        }));

        const seuratMap = {};
        data.seurat.forEach(seura => {
          seuratMap[seura.seura_id] = seura.nimi;
        })


        // Lataa kentät ja luo kenttäkartta
        const kentatMap = {};
        data.kentat.forEach(kentta => {
          kentatMap[kentta.kentta_id] = kentta.kentta;
        });

        // Lisää jokaiseen otteluun kentän nimi
        const ottelutKentannimilla = ottelutJoukkuenimet.map(ottelu => ({
          ...ottelu,
          kentta: kentatMap[ottelu.kentta_id]
        }));

        setJoukkueet(joukkueetLogot);
        setOttelut(ottelutKentannimilla);
        setSeurat(data.seurat);
      }
    }

    fetchData();
  }, []);


  const Item = ({ item, index }) => (
    <View>
      <View style={styles.yksirivi}>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 2 }}>

          <View style={styles.koti}>
            <Image
              style={styles.logo}
              source={{ uri: item.kotilogo }}
            />
            <View style={{ flex: 1 }}>

              <Text onPress={() => showalert(item.kotijoukkue)}
                style={{ flexWrap: 'wrap' }}>{item.kotijoukkue}</Text>
            </View>



          </View>

          <View style={styles.vieras}>
            <Image
              style={styles.logo}
              source={{ uri: item.vieraslogo }}
            // onPress={() => showVierasAlert(item.vierasjoukkue)}
            />
            <View style={{ flex: 1 }}>
              <Text
                onPress={() => showVierasAlert(item.vierasjoukkue)}
                style={{ marginLeft: 2 }}>{item.vierasjoukkue}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )


  const itemSeparator = () => {
    return (<View style={{
      backgroundColor: 'purple',
      width: '100%',
      height: 1,
      alignSelf: 'center',
      marginVertical: 2,

    }}></View>);
  }

    return (
      <View style={styles.container}>

      <View style={{ backgroundColor: 'lightblue', width: '95%', marginTop: 5 }}>

        <View style={{ flexDirection: 'row', borderBottomColor: 'blue', borderBottomWidth: 2, borderColor: 'blue', alignItems: 'center' }}>
          <Text style={{
            width: '30%', borderRightWidth: 1,
            borderRightColor: 'black'
          }}>Joukkue</Text>
          <Text>O</Text>
         {/**  <Text>V</Text>
          <Text>T</Text>
          <Text>H</Text>
          <Text>P</Text>
          <Text>MAALIT</Text>
          */}
          <Text style={{
            width: '15%', borderRightWidth: 1,
            borderRightColor: 'black'
          }}>O</Text>
          <Text style={{
            width: '34%', marginLeft: 1, borderRightWidth: 1,
            borderRightColor: 'black'
          }}>V</Text>

          <Text style={{ width: '34%' }}>Vieras</Text>
        </View>
        <FlatList
          data={ottelut}
          renderItem={Item}
          ItemSeparatorComponent={itemSeparator}
          keyExtractor={item => item.ottelu_id.toString()}
        ></FlatList>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  yksirivi: {
    // flexDirection: 'row', 
    //   alignItems: 'center', 
    //    justifyContent: 'space-between',
    //backgroundColor:'yellow',

  },
  klo: {
    width: '15%',
    borderRightWidth: 1,
    borderRightColor: 'black',

    //backgroundColor:'lightgreen',
  },
  koti: {
    width: '34%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    //backgroundColor:'lightblue',


  },
  kentta: {
    width: '15%',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRightWidth: 1,
    borderRightColor: 'black',

  },
  vieras: {
    width: '34%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 2
    //backgroundColor:'lightyellow',
  },
  logo: {

    width: 25,
    height: 25,
    margin: 2,
    //backgroundColor:'indigo'
  },
  numerot: {
    fontSize: 14,
    fontWeight: 'bold'
  }

});
