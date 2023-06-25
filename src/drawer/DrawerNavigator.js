import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import CustomDrawer from './CustomDrawer';


const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navprops,access,Route}) => {
  return (
    <Drawer.Navigator navprops={navprops} access={access}>
      <Drawer.Screen
        name="MainScreen"
        options={{headerShown: false}}
      >
         {(props) => (
        <MainScreen
            NavProps={navprops} Access={access}
        />
    )}
      </Drawer.Screen>
      {/* <Drawer.Screen
        name="WatchVideoScreen"
        options={{headerShown: false}}
        initialParams={{ showAll: true }}
      >
         {(props) => (
        <WatchVideoScreen
            NavProps={navprops} Access={access} route={Route}
        />
    )}
      </Drawer.Screen> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
