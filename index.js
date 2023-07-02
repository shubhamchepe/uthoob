/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './service';
import messaging from '@react-native-firebase/messaging';


AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().getInitialNotification(async remoteMessage => {
  console.log('Message handled in the kill state', remoteMessage);
});