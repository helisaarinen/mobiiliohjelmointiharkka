import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { harkkaData } from './Supabase';

export default function TestiSupabase() {

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

        setJoukkueet(data.joukkueet);
        setOttelut(ottelutJoukkuenimet);
        setSeurat(data.seurat);
      }
    }

    fetchData();
  }, []);


  return (
    <View style={{ marginStart: 50, marginTop: 50 }}>
  <Text>Joukkueet</Text>

      <FlatList
        data={joukkueet}
        keyExtractor={item => item.joukkue_id.toString()}
        renderItem={({ item }) =>
          <View>
            <Text>{item.nimi}</Text>
          </View>}
      />

      <Text>OTTELUT</Text>
      <FlatList
        data={ottelut}
        keyExtractor={item => item.ottelu_id.toString()}
        renderItem={({ item }) =>
          <View style={{ flexDirection: 'row' }}>
            <Text>{item.alkuaika} </Text>
            <Text>{item.loppuaika} </Text>
            <Text>{item.kotijoukkue} </Text>
            <Text>{item.vierasjoukkue} </Text>
          </View>}
      />

      <Text>LOGOT</Text>
      <FlatList
        data={seurat}
        keyExtractor={item => item.seura_id.toString()}
        renderItem={({ item }) =>
          <View style={{ flexDirection: 'row' }}>
            <Text>{item.nimi} </Text>
            <Image
              style={{ width: 50, height: 50, borderRadius: 1, margin: 1 }}
              source={{ uri: item.logo }}
              onError={() => console.log('kuvan lataaminen')}
            />
          </View>}
      />

      <Image
        style={{ width: 50, height: 50, borderRadius: 1, margin: 1 }}
        source={{ uri: 'https://ulpvgmbqdveehyrvivgk.supabase.co/storage/v1/object/public/logot/IHK_logo_sininen.png?t=2024-04-30T08%3A42%3A43.247Z' }}
        onError={() => console.log('kuvan lataaminen')}
      />

    </View>
  );


}

