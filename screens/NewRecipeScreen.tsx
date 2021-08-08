import * as React from 'react';
import { StyleSheet,Button, Pressable } from 'react-native';
import { useCallback, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { State } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
  requestPermissionsAsync,
} from 'expo-ads-admob';
export default function NewRecipeScreen({navigation}) {
    const [value, onChangeText] = React.useState("");
    const [ingredients,setIngredients] = React.useState([]);

    const [tempIngName,setTempIng] = React.useState("");
    const [tempIngAmount,setTempIngAmount] = React.useState("");
    
    const [dishType, setChecked] = React.useState('normal');
    let ad = "ca-app-pub-7325530075949073/3640648642";

    //let test ="ca-app-pub-3940256099942544/6300978111";
  //ad=test;
useFocusEffect(
  useCallback(() => {
    async function asyncFunction() {
      await setTestDeviceIDAsync('EMULATOR');
      await AdMobInterstitial.setAdUnitID(ad); 
      await requestPermissionsAsync();
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    
       await AdMobInterstitial.showAd()
    
  } 
      asyncFunction();

},[]));




    function addIngredient()
    {
      
      /*console.log("pressed");
      console.log(ingredients); */
      /*let newIngredients = 
      {
        name:'test',
        amount: 'test amount',
      }
*/
      let currentIngredients = [...ingredients];

      let _IngredientName = tempIngName;
      let _IngredientAmount = tempIngAmount;

      // Add item to it
     // currentIngredients.push({ newIngredients });
      currentIngredients.push({name:_IngredientName,amount:_IngredientAmount,checked:false});
      setTempIng("");
      setTempIngAmount("");
     setIngredients(currentIngredients);

      //setIngredients([]);
    }

    
  async function deleteIngredient(Ing)
  {
    
    let newIng = [...ingredients]

      newIng = ingredients.filter(rec => rec !== Ing);
      
      setIngredients(newIng);
  };
 



  return (
    <View style={styles.container}>
      
      <TextInput style={styles.nameInput} editable maxLength={45} placeholder={'Recipe name'}
      onChangeText={text => onChangeText(text)} value={value}
      /> 
      <View style={styles.newIngredientContainer}>
        <TextInput style={styles.newIngredient} maxLength={30} editable placeholder={'Ingredient'} onChangeText={text => setTempIng(text)} value={tempIngName}/>
        <TextInput style={styles.newIngredient} maxLength={8} editable placeholder={'Amount'} onChangeText={text => setTempIngAmount(text)} value={tempIngAmount}/>
        <Pressable style={styles.addIngredientButton} onPress={() => addIngredient()}>
        <Feather name="plus" size={24} color="black" />
        </Pressable>
      </View>
      {
        ingredients.map(ingredient => 
          <View key={ingredient.name} style={styles.ingredient}>
            <Text style={styles.ingName}>
              {ingredient.name}
            </Text>
            <Text style={styles.ingAmount}>
              {ingredient.amount} 
            </Text>
            <Pressable onPress={() => deleteIngredient(ingredient)} style={styles.deleteIngredient}>
            <Feather name="trash-2" size={24} color="black" />
            </Pressable>
          </View>
          )
      }
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="corner-down-left" size={24} color="black"/>
      </Pressable>
      <View style={styles.radioButtons}>
        <View style={styles.radioButton}>
      <RadioButton
        value="vegan"
        status={ dishType === 'vegan' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('vegan')}
      />
      <Text>Vegan</Text>
      </View>
      <View style={styles.radioButton}>
      
      <RadioButton
        value="vegetarian"
        status={ dishType === 'vegetarian' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('vegetarian')}
      />
      <Text>Vegetarian</Text>
      </View>
      <View style={styles.radioButton}>
      <RadioButton
        value="vormal"
        status={ dishType === 'normal' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('normal')}
      />
      <Text>Meat</Text>
      </View>
      </View>
    
     <View style={styles.footer}>
     <Pressable onPress={() => storeData(value,ingredients,dishType).then(navigation.goBack())} style={styles.saveButton}>
        <Text style={{color:'white'}}>
          Save
        </Text>
      </Pressable> 
      <AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-7325530075949073/3640648642" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds
  onDidFailToReceiveAdWithError={(error) => console.log(error)} // true or false
   />
  
      </View> 
    </View>
  );
}
 



let recipes:{ id: number, title: string }[]  = [];

const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@recipes')
      
      if(jsonValue!= null)
      {
          recipes = JSON.parse(jsonValue);
      }
      else{
          recipes = [];
      }
    } catch(e) {
      // read error
    }
    
 
  
  }


const storeData = async (value:string,_ingredients,type) => {
 
   await getMyObject();

    let lastID = 0;

   if(recipes!=null)
    {
        recipes.map((r) => {
            lastID = r.id;
           
        });
    }
    lastID = lastID + 1;

    const newRecipe = 
    {
        id:lastID,
        title:value,
        ingredients:_ingredients,
        type:type
    }

    

    recipes.push(newRecipe);
    try {
      const jsonValue = JSON.stringify(recipes)
      await AsyncStorage.setItem('@recipes', jsonValue)

    } catch (e) {
      console.log(e);
    }
  }
  
const styles = StyleSheet.create({
  radioButtons:
  {
    backgroundColor:'rgba(40, 114, 183, 0.08)',
    paddingHorizontal:40,
    borderRadius:10,
    marginBottom:20,    
  },
  radioButton:
  {
    backgroundColor:'rgba(40, 114, 183, 0.00)',
    flexDirection:'row',
    alignItems:'center',
    margin:1,
  },
  newIngredientContainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-evenly',
    alignItems:'center',
    marginBottom:10,
    marginTop:10,
  }
  ,
  deleteIngredient:
  {
   marginLeft:'auto'
  }
  ,ingAmount:
  {
    marginLeft:'auto'
  },
  ingName:
  {
    marginLeft:'auto'
  },
  ingredient:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%',
    elevation:2,
    marginBottom:10,
    padding:10,
  }
  ,
  addIngredientButton : {
    borderWidth:1,
    borderRadius:20,
    elevation:4,
    backgroundColor:'#FFFFFF'
  }
  ,
  newIngredient:
  {
    borderWidth:1,
    padding:4,
    borderRadius:8,
    borderColor:'#BEB5B5',
  }
  ,
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  nameInput:{
    width: '50%',
    fontSize: 15,
    borderBottomWidth:1,
    padding:10,
    marginBottom:10,
  },
  footer:
  {
   // flex: 1,
    justifyContent: 'flex-end',
  }
  ,
  saveButton:
  {
    alignSelf:'center',
    backgroundColor:'#3FA226',
    padding:10,
    paddingHorizontal:40,
    borderRadius:20,
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
