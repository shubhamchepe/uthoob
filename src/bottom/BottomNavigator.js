import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import WatchVideoScreen from './WatchVideoScreen';

const Bottom = createBottomTabNavigator();

const BottomNavigator = ({NavProps}) => {
  return (
    <Bottom.Navigator>
        <Bottom.Screen name='Subscribed' 
         options={{headerShown: false, tabBarIcon:() => {
          return(
            <Image source={require('../../assets/subs.png')} style={{width:30, height:30}}/>
          )
        }}}>
              {(props) => (
        <Screen1
            NavigationProps={NavProps}
        />
    )}
        </Bottom.Screen>
        <Bottom.Screen name='To-Do List' component={Screen2} options={{headerShown: false, tabBarIcon:() => {
          return(
            <Image source={require('../../assets/todo.png')} style={{width:30, height:30}}/>
          )
        }}}/>
        <Bottom.Screen name='Study Music' component={Screen3} options={{headerShown: false, tabBarIcon:() => {
          return(
            <Image source={require('../../assets/calm.png')} style={{width:30, height:30}}/>
          )
        }}}/>
    </Bottom.Navigator>
  )
}

export default BottomNavigator