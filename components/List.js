//Dette er mine imports
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const List = ({navigation}) => {

    const [ingredients,setingredients] = useState()
//Henter alle ingredienser gemt i databasen under /Ingredients
    useEffect(() => {
        if(!ingredients) {
            firebase
                .database()
                .ref('/Ingredients')
                .on('value', snapshot => {
                    setingredients(snapshot.val())
                });
        }
    },[]);

    // Hvis ikke er der nogen ingredienser vises følgende: 
    if (!ingredients) {
        return <Text>Der er ingen ingredienser at vise.</Text>;
    }

    const handleSelectIngredient = id => {
        /*Ser igennem array af ingredienser og finder det objekt som matcher. */
        const ingredient = Object.entries(ingredients).find( ingredient => ingredient[0] === id /*id*/)
        navigation.navigate('Ingredients Details', { ingredient });
    };
    //Her er array benyttes af Flatlist. Benytter values fra objektet i array. 
    const ingredientArray = Object.values(ingredients);
    const ingredientKeys = Object.keys(ingredients);

    //Her er ændret i teksten så der vises ingredienser på siden. 
    return (
        <FlatList
            data={ingredientArray}
            // Vi bruger ingredientKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til ingredientListItem
            keyExtractor={(item, index) => ingredientKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectIngredient(ingredientKeys[index])}>
                        <Text>
                            {item.Ingrediens1} {item.Ingrediens2} {item.Ingrediens3} {item.Ingrediens4}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default List;

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});