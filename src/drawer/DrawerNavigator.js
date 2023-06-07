import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import CustomDrawer from './CustomDrawer';
import WatchVideoScreen from '../bottom/WatchVideoScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navprops}) => {
  return (
    <Drawer.Navigator navprops={navprops}>
      <Drawer.Screen
        name="MainScreen"
        options={{headerShown: false}}
      >
         {(props) => (
        <MainScreen
            NavProps={navprops}
        />
    )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
