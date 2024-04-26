import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { harkkaData } from './Supabase';

export default function TestiSupabase(){

    const [joukkueet, setJoukkueet] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const data = await harkkaData();
        if (data) {
          setJoukkueet(data);
          console.log('useeffect', data);
        }
      }
  
      fetchData();
    }, []);
  
    // Renderöi jokainen joukkue
    const renderItem = ({ item }) => (
      <View>
        <Text>{item.nimi}</Text>
        {/* Tähän voit lisätä muita joukkueeseen liittyviä tietoja */}
      </View>
    );
  
    return (
        <View style={{marginStart:50, marginTop:50}}>
        <Text>Joukkueet</Text>
        {/* FlatList, joka näyttää joukkueet */}
        <FlatList
          data={joukkueet}
          keyExtractor={item => item.joukkue_id.toString()} // Olettaen, että jokaisella joukkueella on uniikki id
          renderItem={({item}) =>
        <View>
            <Text>{item.nimi}</Text>
        </View>}
        />
      </View>
    );


}

