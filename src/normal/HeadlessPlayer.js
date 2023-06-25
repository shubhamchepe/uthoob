import {NativeModules} from 'react-native'
import BackgroundTimer from 'react-native-background-timer';

const { YouTubeIframeModule } = NativeModules;

BackgroundTimer.runBackgroundTimer(() => {
    YouTubeIframeModule.backgroundPlayer(); // Call the native method to keep the video playing
  }, 1000);
  
  export default () => null;