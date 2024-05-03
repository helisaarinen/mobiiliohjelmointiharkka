import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { harkkaData } from "./Supabase";

export default function Joukkueet() {

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

        const ottelutJoukkuenimet = ottelutFormatted.map(ottelu => ({
          ...ottelu,
          kotijoukkue: joukkueetMap[ottelu.kotijoukkue],
          vierasjoukkue: joukkueetMap[ottelu.vierasjoukkue]
        }));

        const seuratMap = {};
        data.seurat.forEach(seura => {
          seuratMap[seura.seura_id] = seura.nimi;
        })


        const joukkueetLogot = data.joukkueet.map(joukkue => {
          const logo = data.seurat.find(seura => seura.seura_id === joukkue.seura_id)?.logo;
          return { ...joukkue, logo };
        });

        setJoukkueet(joukkueetLogot);
        setOttelut(ottelutJoukkuenimet);
        setSeurat(data.seurat);
      }
    }

    fetchData();
  }, []);

  /*
  const joukkueet = [
      {
      id:1,
      joukkue: 'ihk',
      logo: require('../logot/IHK_logo_sininen.png')
  },
  {
      id:2,
      joukkue: 'koips',
      logo: require('../logot/IHK_logo_sininen.png')
  },
  {
      id:3,
      joukkue: 'pps',
      logo: require('../logot/IHK_logo_sininen.png')
  },
  {
      id:4,
      joukkue: 'PuiU',
      logo: require('../logot/IHK_logo_sininen.png')
  },
  {
      id:5,
      joukkue: 'Vps',
      logo: require('../logot/IHK_logo_sininen.png')
  },
  {
      id:6,
      joukkue: 'Kops',
      logo: require('../logot/IHK_logo_sininen.png')
  }
  
  ];
  */

  const sortedJoukkueet = joukkueet.sort((a, b) => a.nimi.localeCompare(b.nimi));

  const Item = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 1, margin: 1 }}
            source={{ uri: item.logo }}
          />
          <Text style={styles.title}>{item.nimi}</Text>
        </View>
        <Icon name='heart' style={{ fontSize: 20, paddingLeft: 10, }} />
      </View>
    </View>
  )


  return (
    <View style={styles.container}>

      <Text>Joukkueet</Text>
      <FlatList
        data={sortedJoukkueet}
        renderItem={Item}
        keyExtractor={item => item.joukkue_id.toString()}
      ></FlatList>

    </View>

  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'yellow'
  },
  item: {
    backgroundColor: '#f9c2ff',
    color: 'black',
    padding: 5,
    marginVertical: 1,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',


  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    //     backgroundColor:'blue',
    width: '65%'
  },
});