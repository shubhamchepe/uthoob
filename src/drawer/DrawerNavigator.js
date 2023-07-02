import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import CustomDrawer from './CustomDrawer';
import WatchVideoScreen from '../bottom/WatchVideoScreen';


const Drawer = createDrawerNavigator();

const Colors = {
  bg: '#f0e9e9',
  active:'#fff',
  inactive: '#eee',
  transparent:'transparent'
}

const DrawerNavigator = ({navprops,access,Route}) => {
  return (
    <Drawer.Navigator navprops={navprops} access={access} screenOptions={{
      swipeEnabled: false, // Disable swipe gesture
      
      drawerStyle:{
        backgroundColor:Colors.bg,
        width:250,
      }

    }} drawerContent={props => <CustomDrawer {...props}/>}>
      <Drawer.Screen
        name="MainScreen"
        options={{headerShown: false,swipeEnabled:false}}
      >
         {(props) => (
        <MainScreen
            NavProps={navprops} Access={access}
        />
    )}
      </Drawer.Screen>
      <Drawer.Screen
        name="WatchVideoScreen"
        options={{headerShown: false}}
      >
         {(props) => (
        <WatchVideoScreen
            NavProps={navprops} Access={access} pops={props}
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
