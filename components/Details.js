//Alle mine imports
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

//Til at vise detaljer over ingredienser
const Details = ({route,navigation}) => {
    const [ingredient,setIngredient] = useState({});

    useEffect(() => {
        /**/

        setIngredient(route.params.ingredient[1]);

        /**/

        return () => {
            setIngredient({})
        }
    });

    const handleEdit = () => {
        // Sender videre til edit med oplysninger om ingredienser. 
        const ingredient = route.params.ingredient
        navigation.navigate('Edit Ingredients', { ingredient });
    };

    //Se opskrifter funktion. 
    const handleOpskrifter = () => {
        // Sender videre til Vis opskrifter side. 
        const ingredient = route.params.ingredient
        navigation.navigate('Vis Opskrifter', { ingredient });
    };

    //Comfirm delete
    const confirmDelete = () => {
        
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete your ingrediens?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Sletter ingredienser
    const  handleDelete = () => {
        const id = route.params.ingredient[0];
        try {
            firebase
                .database()
                // Indsætter ID
                .ref(`/Ingredients/${id}`)
                // Fjerner ingredienser
                .remove();
            // Navigere tilbage
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!ingredient) {
        return <Text>No data</Text>;
    }

    //Dette er hvad vises på skærmen
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
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
            <Button title="Se hvilke opskrifter du kan lave ud fra disse ingredienser!" onPress={() => handleOpskrifter()} />
        </View>
    );
}

export default Details;

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