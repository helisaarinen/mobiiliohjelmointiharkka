import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Suosikit(){


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

const Item =({item}) => (
    <View style={styles.item}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 1, margin: 1 }}
          source={item.logo}
        />
        <Text style={styles.title}>{item.joukkue}</Text>
      </View>
      <Icon name='heart' style={{ fontSize: 20, paddingLeft:10,   }} />
    </View>
  </View>
)


    return(
        <View style={styles.container}>
            
                <Text>Joukkueet</Text>
        <FlatList
          data={joukkueet}
          renderItem={ Item}  
             keyExtractor={item => item.id.toString()}
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
      color:'black',
      padding:5,
      marginVertical: 1,
      marginHorizontal: 16,
      flexDirection:'row',
      alignItems:'center',


    },
    title: {
      fontSize: 18,
      marginLeft:10,
 //     backgroundColor:'blue',
      width:'65%'
    },
  });