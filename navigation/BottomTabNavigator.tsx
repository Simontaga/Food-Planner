/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      
      barStyle={{ backgroundColor: '#694fad',padding:2,paddingBottom:3 }}
      
      >


      <BottomTab.Screen
        name="Recipes"
        component={TabOneNavigator}
        
        options={{
            
          tabBarLabel: 'Recipes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="microwave" color={color} size={26} />
          ),
          
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        
        component={TabTwoNavigator}
        options={{
          tabBarLabel: 'Shopping',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarLabel: 'Plan',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ title: 'Recipes',
          headerStyle: {
            backgroundColor: '#FFF',
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            //fontWeight: 'bold',
          }, }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
      
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ title: 'Shopping list',
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          //fontWeight: 'bold',
        },  }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabOneParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{  title: 'Week',
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          //fontWeight: 'bold',
        },  }}
      />
    </TabThreeStack.Navigator>
  );
}
