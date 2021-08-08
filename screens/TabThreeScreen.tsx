import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Feather } from '@expo/vector-icons';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
export default function TabThreeScreen({navigation}) {

 // let days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  const [week,setWeek] = React.useState([]);
  const [days,setDays] = React.useState(['monday','tuesday','wednesday','thursday','friday','saturday','sunday']);
  const [recipes,setRecipes] = React.useState([]);


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

  useFocusEffect(
    useCallback(() => {
      async function asyncFunction() {
        
        const jsonValue = await AsyncStorage.getItem('@week');
        let tempWeek = JSON.parse(jsonValue);
      
        if(jsonValue!= null)
        {
         
          if(isRecipeInvalid('monday') == true){ tempWeek['monday'] = -1}
          if(isRecipeInvalid('tuesday') == true){ tempWeek['tuesday'] = -1}
          if(isRecipeInvalid('wednesday') == true){ tempWeek['wednesday'] = -1}
          if(isRecipeInvalid('thursday') == true){ tempWeek['thursday'] = -1}
          if(isRecipeInvalid('friday') == true){ tempWeek['friday'] = -1}
          if(isRecipeInvalid('saturday') == true){ tempWeek['saturday'] = -1;}
          if(isRecipeInvalid('sunday') == true){ tempWeek['sunday'] = -1}
          setWeek(tempWeek);
        //  console.log(tempWeek);

        }
        else
        {
          
          let _week= [];
         _week = {monday:-1,tuesday:-1,wednesday:-1,thursday:-1,friday:-1,saturday:-1,sunday:-1}
          await AsyncStorage.getItem('@week');
          setWeek(_week);
          
        }

        

    } 
        asyncFunction();
        

  },[week]));

  const isDayAssigned = (day) => 
  {
    //kolla även om recept med detta id finns!!!!!!!!!
    if(week[day] != -1 && week[day] != null && week[day] != undefined && !isRecipeInvalid(day))
    {
      return true
    }
    else return false
  }

  const isRecipeInvalid = (day) => 
  {
    let id_ = week[day];
    if(id_ != -1)
    {
      let recipe_ = [];
    recipe_ = recipes.filter(rec => rec.id == id_);
    if(recipe_[0] == undefined)
    {
     
      return true;
    }
    else {return false}
    }
    return false;
  }

  const getRecipeByDay = (day) =>
  {
    let id_ = week[day];
    let recipe_ = [];
    recipe_ = recipes.filter(rec => rec.id == id_);
    if(recipe_[0] == undefined)
    {
     
      return false;
    }
    return recipe_[0];
  }
  

  return (
    <View style={styles.container}>
    <ScrollView  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false} >
      {days.map(day =>
       <View style={styles.weekDayContainer} key={day}>
       <Text style={styles.weekDayTitle}>{day}</Text>
       {!isDayAssigned(day) &&
       <Pressable onPress={() => navigation.navigate('PickRecipe',{day:day})}>
       <View style={styles.weekDayBox}>
         <Text style={{color:'#494949'}}>Pick a recipe</Text>
         <Feather name="plus" size={24} color="black" style={styles.plus} />
       </View>
     </Pressable>
       }
       {isDayAssigned(day) &&
       <Pressable onPress={() => navigation.navigate('PickRecipe',{day:day})}>
        <View style={[styles.weekDayBox,{backgroundColor:getColor(getRecipeByDay(day).type)},{opacity:0.9}]}>
        <Text style={styles.weekDayBoxTitle}>{getRecipeByDay(day).title}</Text>
        <Feather name="edit" size={24} color="black" style={styles.plus} />
      </View>
       </Pressable>
        
       }
     </View>



      )}

      

</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  weekDayContainer:
  {
    flexDirection:'column',
    marginBottom:10,
    marginTop:5,
  },
  weekDayTitle:
  {
    marginBottom:1.5,
  },
  weekDayBox:
  {
    width:200,
    borderWidth:1,
    borderColor:'#968888',
    backgroundColor:'rgba(213, 213, 213, 0.08)',
    padding:15,
    borderRadius:8,
    flexDirection:'row',
    alignItems:'center'
  },
  plus:
  {
    marginLeft:'auto',
    backgroundColor:'white',
    borderRadius:3,
    padding:2,
    elevation:2,
  }
  ,
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-start',
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
  weekDayBoxTitle:
  {
    backgroundColor:'white',
    padding:2,
    borderRadius:3,
    paddingHorizontal:5,
  }
});
