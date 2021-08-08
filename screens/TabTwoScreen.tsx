import * as React from 'react';
import { Pressable, StyleSheet,Alert } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Feather } from '@expo/vector-icons';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';

export default function TabTwoScreen() {

  const [week,setWeek] = React.useState([]);
  const [recipes,setRecipes] = React.useState([]);
  const [shopping,setShopping] = React.useState([]);
  
  
  
  useFocusEffect(
    useCallback(() => {
      async function asyncFunction() {
        
      
        const jsonValue = await AsyncStorage.getItem('@recipes');
        if(jsonValue!= null && JSON.parse(jsonValue) != recipes)
        {
          setRecipes(JSON.parse(jsonValue));
        }
    } 
        asyncFunction();
  
  },[]));
  


  useFocusEffect(
    useCallback(() => {
      async function asyncFunction() {
        
       
        const jsonValue = await AsyncStorage.getItem('@recipes');
        let newRec = JSON.parse(jsonValue);
        if(newRec != recipes)
        {
          setRecipes(JSON.parse(jsonValue));
        }
     /*   if(jsonValue!= null && JSON.parse(jsonValue) != recipes)
        {
          setRecipes(JSON.parse(jsonValue));
        }*/
    } 
        asyncFunction();
  
  },[]));

  
  useFocusEffect(
    useCallback(() => {
      async function asyncFunction() {
        
        const jsonValue = await AsyncStorage.getItem('@week');
       
        
        if(jsonValue!= null && JSON.parse(jsonValue) != week)
        {
          setWeek(JSON.parse(jsonValue));
        }
    } 
        asyncFunction();
        
  
  },[week]));
  
  //get whole week, all valid id:s -> get recipes
 
  useFocusEffect(
    useCallback(() => {
      async function asyncFunction() {
       
        let tempShopping = [];

       Object.entries(week).map((day) => {
         if(day[1] != -1 && day[1] != null)
         {
          tempShopping.push(recipes.filter(rec => rec.id == day[1]));
         }
       }
       
       )
       let _temp = [];
       tempShopping.map((r) => {
        
         _temp.push(r[0]);
       })
       tempShopping = _temp;
       
       
        setShopping(tempShopping);
       
      
       
    } 
        asyncFunction();
        
  
  },[recipes]));
  
  
  
  const getColor = (val) =>
  {
    if(val == 'normal')
    {
      return 'rgba(243, 211, 40, 0.8)';
    }
    else if(val == 'vegan')
    {
      return 'rgba(12, 235, 47, 0.8)';
    }
    else
    {
      return 'rgba(40, 97, 243, 0.8)';
      
    }
  }
 async function testIng(val)
    {
      await AsyncStorage.setItem('@recipes',JSON.stringify(val));
    }
    
    const createTwoButtonAlert = () =>
    Alert.alert(
      "",
      "Player added",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
       <ScrollView  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false} >
      {shopping != undefined && shopping != null && recipes != undefined && recipes != null &&
      
        shopping.map((recipe) =>
        {
         
         return recipe != undefined ?
           
          <View key={recipe.id}style={[styles.shoppingContainer,{backgroundColor:getColor(recipe.type)}]}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            {recipe.ingredients.map((ing) =>
            
            <View style={styles.ingredient}>
              <Text>{ing.name}</Text> 
              <Checkbox status={ing.checked ? 'checked' : 'unchecked'}
                onPress={() => {  if(ing.checked == true){ing.checked = false; testIng(recipes); } else{ing.checked=true; testIng(recipes);}}}>
              </Checkbox>
            </View>
            )}

          </View>
        
         :null
         
        }
        )        

      }
      </ScrollView>
      {shopping[0] == undefined && shopping[6] == undefined && <View style={styles.error}><Text>Add some items to your week</Text></View>}
    </View>
  );
}
const styles = StyleSheet.create({
  error:{position:'absolute',top:'50%'},
  shoppingContainer:{
    marginBottom:10,
    padding:10,
    width:300,
    borderRadius:5,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'

  },
  ingredient:{elevation:2,margin:2,
  flexDirection:'row',
  justifyContent:'space-evenly',
  width:'70%',
  alignContent:'center',
  alignItems:'center'
  },
  recipeTitle:
  {
    
    fontSize:18,
    textAlign:'center',
    backgroundColor:'white',
    borderRadius:13,
    padding:5,
    marginBottom:8,
   
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
