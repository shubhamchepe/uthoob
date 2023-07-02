import { View, Text,ScrollView,BackHandler,ToastAndroid,Image } from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import HeaderComponent from './components/HeaderComponent'
import SubscriptionComponent from './components/SubscriptionComponent'
import VideoCard from './components/VideoCard'
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
  State,
  AppKilledPlaybackBehavior,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import WatchVideoScreen from './WatchVideoScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY} from '@env';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSubs} from '../redux/slices/SubsData';
import {SubsData} from '../data/SubsData'
import {Videos} from '../data/Videos'




const Screen1 = ({props,NavigationProps,AccessToken}) => {
  //console.log(NavigationProps)
  const token = AccessToken;
  const [CardData,SetCardData] = useState([]);
  const [VideoData,SetVideoData] = useState([]);
  const [profiledata, Setprofiledata] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('screen1');
  const [screenParams, setScreenParams] = useState('');
  const dispatch = useDispatch();


  const showToastWithGravity = (err) => {
    ToastAndroid.showWithGravity(
      `${err}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };


  const getCurrentUser = async () => {
    const currentUser = auth().currentUser;

if (currentUser) {
  // User is signed in
  const { uid, displayName, email, photoURL } = currentUser;
   Setprofiledata(currentUser);
  // Access the user's data
  console.log('User ID:', uid);
  console.log('Display Name:', displayName);
  console.log('Email:', email);
  console.log('Photo URL:', photoURL);
} else {
  // No user is signed in
  console.log('No user is signed in.');
}
  };
  const GetSubs = async () => {
    const headers = { 'Authorization': `Bearer ${token}` }; // auth header with bearer token
    fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&mine=true&key=${API_KEY}`, { headers })
    .then(response => response.json()).then(async (resp) => {
      //console.log(resp.items[0].snippet)
      SetCardData(resp.items)
      //Saving data locally to avoid api calls
      

    }).catch(err => showToastWithGravity('Come After 24-Hours'))

}

// const CheckApiDataAsync = async () => {
// try{
//   const jsonValue = await AsyncStorage.getItem('SubsDataAsync');
//   if(jsonValue !== null){
//     console.log('Getting Subs From Async')
//     const carddata = JSON.parse(jsonValue)
//     SetCardData(carddata)
//   }else{
//     console.log('Getting Subs From API')
//     GetSubs();
//   }
// }catch(e){
//  console.log('Error from CheckApiDataAsync',e)
// }
// }




useEffect(() => {

  GetSubs();

  getCurrentUser();

  //ApiCheck();
 
  
  
console.log('Screen 1 Ran')
  
}, [screenParams]);


const ref = useRef();
const onPressTouch = () => {
  ref.current?.scrollTo({
    y: 0,
    animated: true,
  });
}

  return (
    <View style={{flex:1}}>
              <HeaderComponent profilepic={profiledata}/>
               <SubscriptionComponent props={CardData} tokenProp={token} />
             <VideoCard SomeProp={props} SomeOtherProps={NavigationProps} />
            </View>
  )
}

export default Screen1