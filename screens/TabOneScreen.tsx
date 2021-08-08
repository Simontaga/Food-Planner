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
export default function TabOneScreen({navigation}){

  const [recipes,setRecipes] = React.useState([]);

  async function deleteRecipe(r)
  {
    
    let newRecipes = [];
    
    const jsonValue = await AsyncStorage.getItem('@recipes');
      if(jsonValue != null)
      {
        newRecipes = JSON.parse(jsonValue);
      }

      newRecipes = recipes.filter(rec => rec !== r);
      console.log("----");
      console.log(newRecipes);
      await AsyncStorage.setItem('@recipes',JSON.stringify(newRecipes));
      setRecipes(newRecipes);
  };
 
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
      
     
      


      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView style={styles.scrollView}>
      {
        recipes.map
          (
            element =>
            <Pressable  key={element.id} onPress={()=> navigation.navigate('RecipeView',{recipeN : element})}>
            <View style={styles.recipeContainer}  key={element.id}>
            <Badge style={[{backgroundColor:getColor(element.type)},styles.badge]}></Badge>
              <Text key={element.id}>
                
                {element.title}</Text>
           
              </View>
              </Pressable>
          )
      }
      </ScrollView>
      <Pressable style={styles.newRecipeButton}
        onPress={() => navigation.navigate('NewRecipe')}>
          <Text style={styles.newRecipeText}>New recipe</Text>
      </Pressable>
      
    </View>
    </View>
  );
    
  
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

  console.log('Tab one.')

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
    width:"100%",
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
  },
});
