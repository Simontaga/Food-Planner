import * as React from 'react';
import { StyleSheet,Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
export default function RecipeViewScreen({route,navigation}) {
    const { recipeN } = route.params;
    const [recipes,setRecipes] = React.useState([]);
    const [recipe,setRecipe] = React.useState([]);

  

    async function deleteRecipe(r)
  {
    
    let newRecipes = [];
    
    const jsonValue = await AsyncStorage.getItem('@recipes');
      newRecipes = JSON.parse(jsonValue);
      
        let temp = newRecipes.filter(item => item.id !== r.id)
  
      await AsyncStorage.setItem('@recipes',JSON.stringify(temp));
      setRecipes(temp);
  };



  return (
    <View style={styles.container}>
        
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="corner-down-left" size={24} color="black"/>
      </Pressable>
      <Pressable onPress={() => deleteRecipe(recipeN).then(navigation.goBack())} style={styles.deleteButton}>
        <Feather name="trash" size={24} color="black"/>
      </Pressable>
      <View style={styles.recipeContainer}>
        <Text style={styles.recipeTitle}>{recipeN.title}</Text>
         {recipeN.ingredients.map(ing => <View style={styles.ingredient} key={ing.name}><Text>{ing.name}</Text>{ing.amount!='' && <Text>{ing.amount}</Text>}</View>)}
         </View>
    </View>
  );
}




const styles = StyleSheet.create({
  recipeContainer:{marginTop:'33%'},
  recipeTitle:{
    fontSize:25,
  },
  ingredient:{elevation:4,paddingHorizontal:15,paddingVertical:5,minWidth:150,
  flexDirection:'row',
  alignItems:'center',
  alignContent:'center',
  justifyContent:'space-evenly'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton:
  { 
  position: 'absolute',
  left:20,
  top: 40,
  borderColor:'#BEB5B5',
  borderWidth:1,
  borderRadius:5,
  elevation:2,
  backgroundColor:'white',
  padding:2,
},
deleteButton:
  { 
  position: 'absolute',
  right:20,
  top: 40,
  borderColor:'#e91e63',
  borderWidth:1,
  borderRadius:5,
  elevation:2,
  backgroundColor:'white',
  padding:2,
},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
