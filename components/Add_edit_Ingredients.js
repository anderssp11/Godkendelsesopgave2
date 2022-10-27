//Mine imports
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

//Disse er mine elementer som skal gemmes
const Add_edit_Ingredients = ({navigation,route}) => {

    const initialState = {
        Ingrediens1: '',
        Ingrediens2: '',
        Ingrediens3: '',
        Ingrediens4: ''
    }

    const [newIngredient,setNewIngredient] = useState(initialState);

    //True hvis det er edit, og dermed skal der laves edit og ikke oprettes ny. 
    const isEditIngredient = route.name === "Edit Ingredients";

    useEffect(() => {
        if(isEditIngredient){
            const ingredient = route.params.ingredient[1];
            setNewIngredient(ingredient)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewIngredient(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewIngredient({...newIngredient, [name]: event});
    }
    const handlePress = () => {
        navigation.navigate('Scan')
    }


    const handleSave = () => {
//Mine ingredienser
        const { Ingrediens1, Ingrediens2, Ingrediens3, Ingrediens4 } = newIngredient;
//Validering af felter
        if(Ingrediens1.length === 0 || Ingrediens2.length === 0 || Ingrediens3.length === 0 || Ingrediens4.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }
//Hvis det er under edit
        if(isEditIngredient){
            const id = route.params.ingredient[0];
            try {
                firebase
                    .database()
                    //Henter i db
                    .ref(`/Ingredients/${id}`)
                    // Kun nødvendige felter opdateres
                    .update({ Ingrediens1, Ingrediens2, Ingrediens3, Ingrediens4 });
                // Går tilbage 
                Alert.alert("Din info er nu opdateret");
                const ingredient = [id,newIngredient]
                navigation.navigate("Ingredients Details",{ingredient});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
//Hvis det ikke er edit, skal ny oprettes: 
        }else{

            try {
                //Gemmer i db
                firebase
                    .database()
                    .ref('/Ingredients/')
                    .push({ Ingrediens1, Ingrediens2, Ingrediens3, Ingrediens4 });
                Alert.alert(`Saved`);
                setNewIngredient(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                
                {
                    
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newIngredient[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                
                <Button title={ title = "Scan varer med kamera"} onPress={() => handlePress()} />
                <Text> {} </Text>
                <Button title={ isEditIngredient ? "Save changes" : "Add ingredient"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Ingredients;
//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});

