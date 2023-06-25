import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './normal/SplashScreen';
import ParentScreen from './normal/ParentScreen';
import LoginScreen from './normal/LoginScreen';
import WatchVideoScreen from './bottom/WatchVideoScreen';
import PaymentScreen from './normal/PaymentScreen';
import {store} from './redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
         name="ParentScreen"
         component={ParentScreen}
         options={{headerShown: false, orientation:'all'}}
        />
        <Stack.Screen 
         name="LoginScreen"
         component={LoginScreen}
         options={{headerShown: false}}
        />
         <Stack.Screen 
         name="WatchVideoScreen"
         component={WatchVideoScreen}
         options={{headerShown: false, orientation:'all',detachPreviousScreen:true}}
         
        />
         <Stack.Screen 
         name="PaymentScreen"
         component={PaymentScreen}
         options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
