import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './normal/SplashScreen';
import ParentScreen from './normal/ParentScreen';
import LoginScreen from './normal/LoginScreen';
import WatchVideoScreen from './bottom/WatchVideoScreen';
import {store} from './redux/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
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
         options={{headerShown: false}}
        />
        <Stack.Screen 
         name="LoginScreen"
         component={LoginScreen}
         options={{headerShown: false}}
        />
         <Stack.Screen 
         name="WatchVideoScreen"
         component={WatchVideoScreen}
         options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
