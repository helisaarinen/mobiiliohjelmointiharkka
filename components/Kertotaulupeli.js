import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Kertotaulupeli() {

  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [oikeitaVastauksia, setOikeitavastauksia] = useState(0);
  const [tulo, setTulo] = useState('');
  const [vastaus, setVastaus] = useState('');
  const [palaute, setPalaute] = useState('');
  const [peliloppu, setPeliloppu] = useState('');

  useEffect(() => {
    aloitaPeli();
  }, []);

  const annaLasku = () => {
    const luku1 = Math.floor(Math.random() * 10) + 1;
    const luku2 = Math.floor(Math.random() * 10) + 1;
    const oikeavastaus = luku1 * luku2;
    setNumero1(luku1);
    setNumero2(luku2);
    setTulo(oikeavastaus);
  }

  const aloitaPeli = () => {
    annaLasku();
    setOikeitavastauksia(0);
    setVastaus('');
    setPalaute('');
    setPeliloppu('');
  }

  const tarkista = () => {
    const vastattu = parseInt(vastaus);

    if (vastattu !== tulo) {
      setPalaute(<View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 14, fontWeight: 'bold' }}>Oikea vastaus oli {tulo}</Text></View>);
      setVastaus('');
      setPeliloppu(
        <View>
          {oikeitaVastauksia === 1 ? (
            <Text style={{ color: '#FB2595', fontSize: 40, fontWeight: 'bold' }}>
              Sait {oikeitaVastauksia} pisteen</Text>
          ) : (
            <Text style={{ color: '#FB2595', fontSize: 40, fontWeight: 'bold' }}>
              Sait {oikeitaVastauksia} pistettä</Text>
          )}
          <Button title="Pelaa uudestaan" onPress={aloitaPeli} />
        </View>

      )
    } else if (vastattu === tulo) {
      setPalaute(
        <View>
          <Text style={{ color: 'limegreen', fontSize: 30, fontWeight: 'bold' }}>Oikein!</Text>
          <Text style={{ color: 'limegreen', fontSize: 14, fontWeight: 'bold', textAlign:'center' }}
          >{numero1} x {numero2} = {tulo}</Text>
        </View>);
      annaLasku();
      setVastaus('');
      setOikeitavastauksia(oikeitaVastauksia + 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: 'blue', fontSize: 40, fontWeight: 'bold' }}>Kertotaulupeli</Text>
      <Text style={{ color: 'green', fontSize: 30, fontWeight: 'bold' }}>{numero1} x {numero2}</Text>

      {peliloppu ? (

        <View>
          <Text style={{ textAlign: 'center' }}>{palaute}</Text>
          <Text style={{ textAlign: 'center' }}>{peliloppu}</Text>
        </View>
      ) : (

        <View>
          <TextInput
            onChangeText={text => setVastaus(text)}
            inputMode='numeric'
            value={vastaus}
            style={{
              borderColor: 'blue',
              borderWidth: 1,
              padding: 10,
              margin: 10,
              width: 80,
              backgroundColor: 'lightblue'
            }}
          />
          <Button title="VASTAA" onPress={tarkista} />
          <Text style={{ textAlign: 'center' }}>{palaute}</Text>
          <Text>{peliloppu}</Text>
        </View>)}

      {/**       
       <TextInput
      onChangeText={text => setVastaus(text)}
      inputMode='numeric'
      value={vastaus}
      style={{
        borderColor: 'blue',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        width: 80,
        backgroundColor: 'lightblue'
      }}
    />
  <Button title="Vastaa" onPress={tarkista} />
      <Text>{palaute}</Text>
      <Text>{peliloppu}</Text>
     */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3FECE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
