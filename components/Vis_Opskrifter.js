//Denne komponent bruges til at vise hvilke opskrifter man kan lave ud fra de ingredienser man har til rådighed. 
//Imports
import * as React from 'react';
import { View, Text, Image, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
//Imports af billeder
import BurgerImage from "../assets/burger.png"
import Taco from "../assets/taco.png"

const Vis_Opskrifter = ({route,navigation}) => {

    const [ingredient,setIngredient] = useState({});

    useEffect(() => {
        
        setIngredient(route.params.ingredient[1]);

        return () => {
            setIngredient({})
        }
    });
//Dette er hvad brugeren får vist på skærm 
    return(
        <View style={styles.container}>
           <Text>Her er en liste over de indtastede ingredienser:</Text>
            {
                Object.entries(ingredient).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/**/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/**/}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
             <Text>Ud fra følgende ingredienser kan du lave følgende opskrifter:</Text>
             <Text>Burger</Text>
            <Image source={BurgerImage} style={{width:200, height:200}} />
            <Text>Taco</Text>
            <Image source={Taco} style={{width:200, height:200}} />
            
        </View>
        
    )
}

export default Vis_Opskrifter;
//Styling
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});
