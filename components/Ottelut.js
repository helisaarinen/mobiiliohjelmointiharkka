import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Alert } from 'react-native';


export default function Ottelut(route) {

  const ottelut = [
    {
      id: 1,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 3,
      vierasmaalit: 1,
      kentta:1
    },
    {
      id: 2,
      koti: 'kotijoukkueella tosi pitkä nimi',
      vieras: 'vierasjoukkueella pitkä nimi',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 3,
      vierasmaalit: 1,
      kentta:2

    },
    {
      id: 3,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 3,
      vierasmaalit: 1,
      kentta:1
    },
    {
      id: 4,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 3,
      vierasmaalit: 1,
      kentta:1
    },
    {
      id: 5,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 3,
      vierasmaalit: 1,
      kentta:2
    },
    {
      id: 6,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 3,
      vierasmaalit: 1,
      kentta:1
    },
    {
      id: 7,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 3,
      vierasmaalit: 1,
      kentta:2
    },
    {
      id: 8,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 3,
      vierasmaalit: 1,
      kentta:1
    },
    {
      id: 9,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 23,
      vierasmaalit: 1,
      kentta:2
    },
    
    {
      id: 10,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 23,
      vierasmaalit: 1,
      kentta:1
    },
    
    {
      id: 11,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 23,
      vierasmaalit: 1,
      kentta:2
    },
    
    {
      id: 12,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 23,
      vierasmaalit: 1,
      kentta:1
    },
    
    {
      id: 13,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 23,
      vierasmaalit: 1,
      kentta:1
    },
    
    {
      id: 14,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 23,
      vierasmaalit: 1,
      kentta:1
    },
    
    {
      id: 15,
      koti: 'koti',
      vieras: 'vieras',
      kotilogo: require('../logot/IHK_logo_sininen.png'),
      vieraslogo: require('../logot/Vieras.png'),
      alkaa: '12.00',
      loppuu: '12.20',
      kotimaalit: 23,
      vierasmaalit: 1,
      kentta:1
    },
  ]

  const showalert=(koti)=>{
    return(
      Alert.alert('Klikkasit joukkuetta', 'Klikkasit kotijoukkuetta: '+ koti )
    )
  }

  
  const showVierasAlert=(vieras)=>{
    return(
      Alert.alert('Klikkasit', 'Klikkasit vierasjoukkuetta ' + vieras)
    )
  }

  const Item = ({ item, index }) => (
    <View>
      <View style={styles.yksirivi}>
        <View style={{ flexDirection: 'row', alignItems:'center',margin:2 }}>

          <View style={styles.klo}>
            <Text>{item.alkaa}-</Text>
            <Text>{item.loppuu}</Text>
          </View>

          <View style={styles.kentta}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.kentta}>{item.kentta}</Text>
              </View>
          </View>

         <View style={styles.koti}>
         <Image
              style={styles.logo}
              source={item.kotilogo}
              onPress={() => showalert(item.koti)}
            />
            <View style={{flex:1}}>
            
            <Text onPress={() => showalert(item.koti)} 
            style={{ flexWrap: 'wrap' }}>{item.koti}</Text>
            </View>



          </View>
          
          <View style={styles.vieras}>
            <Image
              style={styles.logo}
              source={item.vieraslogo}
              onPress={() => showVierasAlert(item.vieras)}
            />
                        <View style={{flex:1}}>
            <Text
             onPress={() => showVierasAlert(item.vieras)}
            style={{ marginLeft: 2 }}>{item.vieras}</Text>
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
      marginVertical: 2
    }}></View>);
  }

  return (
    <View style={styles.container}>

      <View style={{ backgroundColor: 'lightblue', width: '95%', marginTop: 5 }}>

        <View style={{ flexDirection: 'row', borderBottomColor:'blue',borderBottomWidth:2, borderColor:'blue', alignItems:'center' }}>
          <Text style={{ width: '15%' }}>Klo</Text>
          <Text style={{ width: '15%' }}>Kenttä</Text>
          <Text style={{ width: '34%', marginLeft:10 }}>Koti</Text>
 
          <Text style={{ width: '34%' }}>Vieras</Text>
        </View>
        <FlatList
          data={ottelut}
          renderItem={Item}
          ItemSeparatorComponent={itemSeparator}
          keyExtractor={item => item.id.toString()}
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
  klo:{
    width: '15%', 

    //backgroundColor:'lightgreen',
  },
  koti:{
    width: '34%', 
    flexDirection: 'row', 
  justifyContent: 'flex-end', 
    alignItems: 'center',
    //backgroundColor:'lightblue',

    
  },
  kentta:{
    width: '15%', 
    alignItems: 'center',
   // backgroundColor:'lightgreen',
    
  },
  vieras:{
    width: '34%', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent:'flex-start',
    marginLeft:5
    //backgroundColor:'lightyellow',
  },
  logo:{

    width: 25, 
    height: 25, 
    margin:2,
    //backgroundColor:'indigo'
  },
  numerot:{
    fontSize:14,
    fontWeight:'bold'
  }

});
