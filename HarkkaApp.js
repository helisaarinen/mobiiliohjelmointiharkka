import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Etusivu from './components/Etusivu'
import Ottelut from './components/Ottelut'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Kertotaulupeli from './components/Kertotaulupeli';
import Joukkueet from './components/Joukkueet';
import Kentat from './components/Kentat';
import Suosikit from './components/Suosikit';
import Tulokset from './components/Tulokset';
import Ohjeet from './components/Ohjeet';
import Timer from './components/Timer';
import Pisteet from './components/Pisteet';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator header>
        <Stack.Screen name="Etusivu" component={Etusivu}></Stack.Screen>
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="Ottelut" component={Ottelut} />
        <Stack.Screen name="Joukkueet" component={Joukkueet}/>
        <Stack.Screen name="Suosikit" component={Suosikit}/>
        <Stack.Screen name="Kentät" component={Kentat}/>
        <Stack.Screen name="Tulokset" component={Tulokset}/>
        <Stack.Screen name="Ohjeet" component={Ohjeet}/>
        <Stack.Screen name="Pisteet" component={Pisteet}/>

        
        <Stack.Screen name="Kertotaulupeli" component={Kertotaulupeli} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
