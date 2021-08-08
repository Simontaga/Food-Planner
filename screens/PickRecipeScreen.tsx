import * as React from 'react';
import { StyleSheet,Button, Pressable } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, State } from 'react-native-gesture-handler';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import NewRecipeScreen from './NewRecipeScreen';
import { useFocusEffect } from '@react-navigation/native';
import { Badge } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
export default function PickRecipeScreen({route,navigation}) {
    const { day } = route.params;
    const [recipes,setRecipes] = React.useState([]);

     
  useFocusEffect(
    useCallback(() => {
      async function asyncFunction() {
        
        const jsonValue = await AsyncStorage.getItem('@recipes');
        if(jsonValue!= null)
        {
          setRecipes(JSON.parse(jsonValue));
        }
    } 
        asyncFunction();

  },[recipes]));


    
  const getColor = (val) =>
  {
    if(val == 'normal')
    {
      return '#F3D328';
    }
    else if(val == 'vegan')
    {
      return '#0CEB2F';
    }
    else
    {
      return '#2861F3';
      
    }
}
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="corner-down-left" size={24} color="black"/>
      </Pressable>
        <Text style={styles.title}>{day}</Text>

        <ScrollView style={styles.scrollView}>
      {
        recipes.map
          (
            element =>
          
          
            <View style={styles.recipeContainer}  key={element.id}>
            <Badge style={[{backgroundColor:getColor(element.type)},styles.badge]}></Badge>
              <Text key={element.id}>
                
                {element.title}</Text>
              <Pressable style={styles.deleteButton} onPress={() => assingRecipeDay(day,element).then(navigation.goBack())}>
              <Feather name="check-square" size={24} color="black" />
                </Pressable>
              </View>
              
          )
      }
      </ScrollView>
    </View>
  );
}

const assingRecipeDay = async (day,recipe) => 
{
/* save recipe - day */

    const week = await AsyncStorage.getItem('@week');
    
    
    
    if(week != null && week != undefined)
    {
        let _week = [];
        _week = JSON.parse(week);
         _week[day] = recipe.id;
        
        await AsyncStorage.setItem('@week',JSON.stringify(_week));
    }
    else
    {
      
        let _week = {monday:-1,tuesday:-1,wednesday:-1,thursday:-1,friday:-1,saturday:-1,sunday:-1};
        _week[day] = recipe.id;
       await AsyncStorage.setItem('@week',JSON.stringify(_week));
    }

}

const getMyObject = async () => {
  
    try {
      const jsonValue = await AsyncStorage.getItem('@recipes')
      
      if(jsonValue!= null)
      {
        this.setRecipes(JSON.parse(jsonValue));
        console.log("---");   
      }
    } catch(e) {
      // read error
    }
  }


  const styles = StyleSheet.create({
    newRecipeButton:{
        backgroundColor:'#27BF52',
        width:183,
        height:44,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:9,
        marginBottom:10,
        elevation:3,
      },
      newRecipeText:{
        color:"white",
        fontSize:18,
      }
      ,
      badge:{alignSelf:'center',elevation:2,marginRight:8}
      ,
      recipeContainer:
      {
        borderWidth: 1,
        borderColor:'#EDEDED',
        backgroundColor:'#FFFFFF',
        margin:10,
        width:280,
        padding:14,
        borderRadius:6,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        elevation:1,
      },
      deleteButton:{
        alignItems: 'center',
        marginLeft:'auto',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        alignSelf:'flex-end',
      },
      scrollView:{
        marginTop:5,
      }
      ,
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
      
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:40,
        backgroundColor:'#fafafa',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:15,
        elevation:2,
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
});

