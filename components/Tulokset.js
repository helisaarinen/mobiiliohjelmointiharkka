import { StatusBar } from 'expo-status-bar';
import { StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  Alert, 
  Button, 
  Modal } from 'react-native';
import Pisteet from './Pisteet';
import { harkkaData } from './Supabase';
import { useEffect, useState } from 'react';
import styles from '../style/styles';

export default function Tulokset({ navigation }) {


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

  const showalert = (koti) => {
    return (
      Alert.alert('Klikkasit joukkuetta', 'Klikkasit kotijoukkuetta: ' + koti)
    )
  }


  const showVierasAlert = (vieras) => {
    return (
      Alert.alert('Klikkasit', 'Klikkasit vierasjoukkuetta ' + vieras)
    )
  }


  const [modalVisible, setModalVisible] = useState(false);



  const Item = ({ item, index }) => (
    <View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 2 }}>

          <View style={styles.tuloksetKlo}>
            <Text>{item.alkuaika}-</Text>
            <Text>{item.loppuaika}</Text>
          </View>


          <View style={styles.tuloksetKoti}>
          <View style={{ flex: 1 }}>
            <Text onPress={() => showalert(item.koti)}
              style={{ flexWrap: 'wrap'}}>{item.kotijoukkue}</Text>
            </View>
            <Image
              style={styles.logoPieni}
              source={{ uri: item.kotilogo }}
              onPress={() => showalert(item.koti)}
            />
          </View>

          <View style={styles.tuloksetTulos}>
            <View style={{ flexDirection: 'row', justifyContent:'center' }}>
              <Text style={styles.numerot}>{item.kotimaalit}</Text>
              <Text style={styles.numerot}>-</Text>
              <Text style={styles.numerot}>{item.vierasmaalit}</Text></View>
          </View>

          <View style={styles.tuloksetVieras}>
            <Image
              style={styles.logoPieni}
              source={{ uri: item.vieraslogo }}
              onPress={() => showVierasAlert(item.vieras)}
            />
            <View style={{ flex: 1 }}>
              <Text
                onPress={() => showVierasAlert(item.vieras)}
                style={{ marginLeft: 2 }}>{item.vierasjoukkue}</Text>
            </View>
          </View>
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
      marginVertical: 2
    }}></View>);
  }


  const buttonPressed = () => {

  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'lightblue', width: '95%', marginTop: 5 }}>
        {/**         <Button title='PISTEET' onPress={() => navigation.navigate('Pisteet')}></Button>*/}

        <Button title='PISTEET' onPress={() => setModalVisible(true)} />
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { setModalVisible(!modalVisible) }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Pisteet />
              <Button title="Sulje" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.ottelutFlatlist }>

        <View style={styles.ottelutFlatlistHeader}>
          <Text style={{ width: '20%' }}>Klo</Text>
          <Text style={{ width: '30%' }}>Koti</Text>
          <Text style={{ width: '20%' }}>Tulos</Text>
          <Text style={{ width: '30%' }}>Vieras</Text>
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

/** 
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
    width: '20%',

    //backgroundColor:'lightgreen',
  },
  koti: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor:'lightblue',


  },
  tulos: {
    width: '20%',
    alignItems: 'center',
    //backgroundColor:'lightgreen'

  },
  vieras: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

})*/;
