import { View, Text, Image,useColorScheme } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import UiTest from './UiTest'

const Bottom = createBottomTabNavigator();

const BottomNavigator = ({NavProps,Access}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Bottom.Navigator  screenOptions={{
      tabBarStyle: { backgroundColor: isDarkMode ? '#282828' : '#fff' },
    }}>
        <Bottom.Screen name='Subscribed' 
         options={{headerShown: false, tabBarIcon:() => {
          return(
            <Image source={require('../../assets/subs.png')} style={{width:30, height:30}}/>
          )
        }}}>
              {(props) => (
        <Screen1
            NavigationProps={NavProps}
            AccessToken = {Access}
        />
    )}
        </Bottom.Screen>
        <Bottom.Screen name='To-Do List' options={{headerShown: false, tabBarIcon:() => {
          return(
            <Image source={require('../../assets/todo.png')} style={{width:30, height:30}}/>
          )
        }}}>
                  {(props) => (
        <Screen2
            NavigationProps={NavProps}
            AccessToken = {Access}
        />
    )}
    </Bottom.Screen>
        <Bottom.Screen name='Study Music' component={Screen3} options={{headerShown: false, tabBarIcon:() => {
          return(
            <Image source={require('../../assets/calm.png')} style={{width:30, height:30}}/>
          )
        }, tabBarStyle: {display: 'none'}}}/>
    </Bottom.Navigator>
  )
}

export default BottomNavigator