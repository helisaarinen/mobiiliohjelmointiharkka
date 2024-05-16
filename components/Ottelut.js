import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
  Button,
  TextInput
} from 'react-native';
import { useEffect, useState } from 'react';
import { harkkaData } from './Supabase';
import styles from '../style/styles';
import { useNavigation } from '@react-navigation/native';

export default function Ottelut(route) {

  const [joukkueet, setJoukkueet] = useState([]);
  const [ottelut, setOttelut] = useState([]);
  const [seurat, setSeurat] = useState([]);
  const [kotimaalit, setKotimaalit] =useState(null);
  
  const [vierasmaalit, setVierasmaalit] =useState(null);

  const [selectedOttelu_id, setSelectedOttelu_id] = useState(null);
  const [selectedOttelu, setSelectedOttelu] =useState(null);

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

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

        const kentatMap = {};
        data.kentat.forEach(kentta => {
          kentatMap[kentta.kentta_id] = kentta.kentta;
        });

        const selectedOttelu = ottelutFormatted.find(ottelu => ottelu.ottelu_id === selectedOttelu_id);
        if (selectedOttelu) {
          const kotijoukkue = data.joukkueet.find(joukkue => joukkue.joukkue_id === selectedOttelu.kotijoukkue);
          const vierasjoukkue = data.joukkueet.find(joukkue => joukkue.joukkue_id === selectedOttelu.vierasjoukkue);
          const kotilogo = data.seurat.find(seura => seura.seura_id === kotijoukkue.seura_id)?.logo;
          const vieraslogo = data.seurat.find(seura => seura.seura_id === vierasjoukkue.seura_id)?.logo;

          setSelectedOttelu({
            ...selectedOttelu,
            kotijoukkue: kotijoukkue.nimi,
            vierasjoukkue: vierasjoukkue.nimi,
            kotilogo: kotilogo,
            vieraslogo: vieraslogo,
          });
        }



        const ottelutKentannimilla = ottelutJoukkuenimet.map(ottelu => ({
          ...ottelu,
          kentta: kentatMap[ottelu.kentta_id]
        }));

        setJoukkueet(joukkueetLogot);
        setOttelut(ottelutKentannimilla);
        setSeurat(data.seurat);
        //console.log(ottelut);
        
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


    const handleTallenna = async () => {
      try {
        if (!selectedOttelu) {
          Alert.alert('Virhe', 'Valitse ensin ottelu.');
          return;
        }
    
        if (kotimaalit === null || vierasmaalit === null) {
          Alert.alert('Virhe', 'Syötä koti- ja vierasmaalit ennen tallentamista.');
          return;
        }
    
        const otteluId = selectedOttelu.ottelu_id;
        const { data, error } = await data
          .from('ottelut')
          .update({ kotimaalit, vierasmaalit })
          .eq('ottelu_id', otteluId);
    
        if (error) {
          console.error('Virhe tallennettaessa ottelun tietoja:', error.message);
          Alert.alert('Virhe', 'Tallennuksessa tapahtui virhe.');
          return;
        }
    
        console.log('Ottelun tiedot tallennettu onnistuneesti:', data);
        Alert.alert('Tallennus', 'Tallennus onnistui.');
    
      } catch (error) {
        console.error('Virhe tallennettaessa: ', error);
        Alert.alert('Virhe', 'Tallennuksessa tapahtui virhe.');
      }
    };

    const haeSelectedOttelu = async (otteluId) => {
      try {
        const data = await harkkaData();
        if (data) {
          const ottelu = data.ottelut.find(ottelu => ottelu.ottelu_id === otteluId);
          const kenttaNimi = data.kentat.find(kentta => kentta.kentta_id === ottelu.kentta_id)?.kentta;
          const kotijoukkueNimi = data.joukkueet.find(joukkue => joukkue.joukkue_id === ottelu.kotijoukkue)?.nimi;
          const vierasjoukkueNimi = data.joukkueet.find(joukkue => joukkue.joukkue_id === ottelu.vierasjoukkue)?.nimi;
    
          setSelectedOttelu({
            ...ottelu,
            kenttaNimi: kenttaNimi,
            kotijoukkueNimi: kotijoukkueNimi,
            vierasjoukkueNimi: vierasjoukkueNimi,
            alkuaika: ottelu.alkaa.substring(0, 5),
            loppuaika: ottelu.loppuu.substring(0, 5)
          });
    
          console.log('Valittu ottelu ', ottelu);
        }
      } catch (error) {
        console.error('Virhe haettaessa ottelutietoja: ', error);
      }
    };

    const handlePress = async (otteluId) => {
      await haeSelectedOttelu(otteluId);
      setModalVisible(true);
    };
    
    
  const Item = ({ item, index }) => (


    <View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 2 }}>

          <View style={styles.ottelutKlo}>
            <TouchableOpacity onPress={() => handlePress(item.ottelu_id)}>
              
              <Text>{item.alkuaika}-</Text>
              <Text>{item.loppuaika}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ottelutKentta}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{item.kentta}</Text>
            </View>
          </View>

          <View style={styles.ottelutKoti}>
            <Image
              style={styles.logoPieni}
              source={{ uri: item.kotilogo }}
            //   onPress={() => showalert(item.kotijoukkue)}
            />
            <View style={{ flex: 1 }}>

              <Text onPress={() => showalert(item.kotijoukkue)}
                style={{ flexWrap: 'wrap' }}>{item.kotijoukkue}</Text>
            </View>



          </View>

          <View style={styles.ottelutVieras}>
            <Image
              style={styles.logoPieni}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible) }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'pink', padding: 20, borderRadius: 10 }}>
            <View style={styles.otteluinfo}>
              <Text style={{color:'blue'}}>Ottelu klo {selectedOttelu?.alkuaika} - {selectedOttelu?.loppuaika}</Text>
              <Text style={{color:'blue'}}>Kentällä {selectedOttelu?.kenttaNimi} </Text>
              <Text style={{color:'blue'}}>{selectedOttelu?.kotijoukkueNimi} maalit:</Text>
              <TextInput
                style={styles.input}
                value={kotimaalit}
                onChangeText={setKotimaalit}
                keyboardType="numeric"
                placeholder="Kotimaalit"
              />
            </View>
            <View style={styles.otteluinfo}>
              <Text>{selectedOttelu?.vierasjoukkueNimi} maalit:</Text>
              <TextInput
                style={styles.input}
                value={vierasmaalit}
                onChangeText={setVierasmaalit}
                keyboardType="numeric"
                placeholder="Vierasmaalit"
              />
            </View>
            <Button title="Tallenna" onPress={handleTallenna} />
            <Button title="Sulje" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
        <StatusBar style="auto" />
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

        <View style={styles.ottelutFlatlistHeader}>
          <Text style={[styles.ottelutKlo, { fontWeight: 'bold' }]}>Klo</Text>
          <Text style={[styles.ottelutKentta, { fontWeight: 'bold' }]}>Kenttä</Text>
          <Text style={[styles.ottelutKoti, { fontWeight: 'bold', paddingLeft: 30 }]}>Koti</Text>
          <Text style={[styles.ottelutVieras, { fontWeight: 'bold', paddingLeft: 30 }]}>Vieras</Text>
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
;
