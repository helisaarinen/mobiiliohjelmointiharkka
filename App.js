import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Etusivu from './components/Etusivu';
import EtusivuTabs from './components/EtusivuTabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';
import Ohjeet from './components/Ohjeet';
import Tulokset from './components/Tulokset';
import Ottelut from './components/Ottelut';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { useState, useEffect } from 'react';
import Joukkueet from './components/Joukkueet';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Timer from './components/Timer';
import Suosikit from './components/Suosikit';
import Kentat from './components/Kentat';
import Pisteet from './components/Pisteet';
import {harkkaData} from './components/Supabase'
import TestiSupabase from './components/TestiSupabase';


function MenuScreen() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show menu</Button>}>
        <Menu.Item onPress={() => {Ottelut}} title="Sisältö 1" />
        <Menu.Item onPress={() => { }} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => { }} title="Item 3" />
      </Menu>
    </View>
  );
}
/*
SettingsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <Button onPress={() => { SettingsScreen }}></Button>
    )
  }
}*/

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Etusivu') {
      iconName = 'home';
    } else if (route.name === 'Ottelut') {
      iconName = 'football-outline';
    } else if (route.name === 'Joukkueet') {
      iconName = 'people-outline';
    } else if (route.name === 'Tulokset') {
      iconName = 'podium-outline';
    } else if (route.name === 'Ohjeet') {
      iconName = 'information-circle-outline';
    } else if (route.name === 'Valikko') {
      iconName = 'menu-outline';
    }else if (route.name === 'Suosikit') {
      iconName = 'menu-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  tabBarGap: 10,

});

const Tab = createBottomTabNavigator();
//const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const EtusivuStackScreen = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Etusivu"
      component={EtusivuTabs}
      options={{
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Suosikit')}
            title="Suosikit"
          />
        ),
      }}
    />
  </Stack.Navigator>
);


export default function App() {
  
  const [joukkueet, setJoukkueet] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await harkkaData();
      if (data) {
        setJoukkueet(data);
      }
    }

    fetchData();
  }, []);
  
  return (
    
<View>
  <TestiSupabase/>

</View>
    

/*
    <Provider>
          <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Etusivu" component={EtusivuTabs} />
          <Tab.Screen name="Ottelut" component={Ottelut} />
          <Tab.Screen name="Joukkueet" component={Joukkueet} />
          <Tab.Screen name="Tulokset" component={Tulokset} />
          <Tab.Screen name="Ohjeet" component={Ohjeet} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
      </Provider>
  */
     );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});