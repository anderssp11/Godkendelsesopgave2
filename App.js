//Alle mine imports
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useEffect, useState} from 'react';
import firebase from "firebase/compat";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "firebase/database";
import "firebase/firestore";
import { doc } from 'firebase/firestore';

import Ionicons from "react-native-vector-icons/Ionicons";
import { BarCodeScanner } from 'expo-barcode-scanner'; 

/*
{
  "rules": {
    ".read": "now < 1666821600000",  // 2022-10-27
    ".write": "now < 1666821600000",  // 2022-10-27
  }
}
*/
//Imports af components
import Details from "./components/Details";
import List from "./components/List";
import Vis_Opskrifter from "./components/Vis_Opskrifter";
import Add_edit_Ingredients from './components/Add_edit_Ingredients';
import Scan_varer from "./components/Barcode_scanner";
import Swipe_component from './components/Swipe_component';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCSIhXSMW_oVJNb7IT2N_bbcLI2bLRba68",
  authDomain: "fir-ovelse.firebaseapp.com",
  databaseURL: "https://fir-ovelse-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-ovelse",
  storageBucket: "fir-ovelse.appspot.com",
  messagingSenderId: "93121674263",
  appId: "1:93121674263:web:71be3d88aaf693a86df052"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  //Alle de forskellige screens i app
  const StackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Details"
        > 
            <Stack.Screen name="List" component={List}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#ba6262'}}
                          }
            />
            <Stack.Screen name="Ingredients Details" component={Details} options={{
                headerTitleStyle: { textAlign: 'right', color: 'white' },
                headerStyle: {backgroundColor: '#62bab5'}
            }} />
            <Stack.Screen name="Edit Ingredients" component={Add_edit_Ingredients} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#628bba'}
            }}
            />
            <Stack.Screen name="Vis Opskrifter" component={Vis_Opskrifter} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#628bba'}
            }}
            />
            <Stack.Screen name="Scan" component={Scan_varer} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#628bba'}
            }}
            />
             <Stack.Screen name="Swipe" component={Swipe_component} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#628bba'}
            }}
            />

        </Stack.Navigator>
    )
}

  
//Knapper i bunden hvor du enten kan på "Hjem" eller "Tilføj dine ingredienser"
export default function App() {

  
  return (
    <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen name={'Hjem'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
    <Tab.Screen name={'Tilføj dine ingredienser'} component={Add_edit_Ingredients} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
    <Tab.Screen  name={'Swipe'} component={Swipe_component} options={{tabBarIcon: () => ( <Ionicons name="fast-food-outline" size={20} />) } }/> 

    </Tab.Navigator>
  </NavigationContainer>
  );
}
//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

