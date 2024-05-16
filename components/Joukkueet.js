import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, 
Text, 
View, 
Button, 
TextInput, 
SafeAreaView, 
FlatList, 
Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { harkkaData } from "./Supabase";
import styles from "../style/styles";

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

  const sortedJoukkueet = joukkueet.sort((a, b) => a.nimi.localeCompare(b.nimi));

  const Item = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 1, margin: 1 }}
            source={{ uri: item.logo }}
          />
          <Text style={styles.joukkueetName}>{item.nimi}</Text>
        </View>
      </View>
    </View>
  )


  const itemSeparator = () => {
    return (<View style={{
      backgroundColor: '#35ADF7',
      width: '100%',
      height: 1,
      alignSelf: 'center',
      marginVertical: 2,

    }}></View>);
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.ottelutFlatlist}>

      <FlatList
        data={sortedJoukkueet}
        renderItem={Item}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={item => item.joukkue_id.toString()}
      ></FlatList>

    </View>
    </View>

  )
};
;