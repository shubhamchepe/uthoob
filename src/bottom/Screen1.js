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
    dispatch(fetchSubs(token))
    const headers = { 'Authorization': `Bearer ${token}` }; // auth header with bearer token
    fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&mine=true&key=${API_KEY}`, { headers })
    .then(response => response.json()).then(async (resp) => {
      //console.log(resp.items[0].snippet)
      SetCardData(resp.items)
      //Saving data locally to avoid api calls
      try{
        const jsonValue = JSON.stringify(resp.items);
        await AsyncStorage.setItem('SubsDataAsync', jsonValue);
      }catch(error){
        console.log(error)
      }
      

    }).catch(err => showToastWithGravity('Come After 24-Hours'))

}

const CheckApiDataAsync = async () => {
try{
  const jsonValue = await AsyncStorage.getItem('SubsDataAsync');
  if(jsonValue !== null){
    console.log('Getting Subs From Async')
    const carddata = JSON.parse(jsonValue)
    SetCardData(carddata)
  }else{
    console.log('Getting Subs From API')
    GetSubs();
  }
}catch(e){
 console.log('Error from CheckApiDataAsync',e)
}
}



useEffect(() => {

  CheckApiDataAsync();

  getCurrentUser();

  //ApiCheck();
 
  
  
console.log('Screen 1 Ran')
  // return () => {
  //   backHandler.remove();
  //   try { TrackPlayer.reset() } catch(err){console.log(err)};
  // };
  
}, []);
const ref = useRef();
const onPressTouch = () => {
  ref.current?.scrollTo({
    y: 0,
    animated: true,
  });
}

const renderScreen = () => {
  switch (currentScreen) {
    case 'screen1':
      return (<View style={{flex:1}} navigate={navigate}>
              <HeaderComponent profilepic={profiledata}/>
               <SubscriptionComponent props={CardData} tokenProp={token} />
             <VideoCard SomeProp={props} SomeOtherProps={NavigationProps} navigate={navigate} routeparams={routeparams}/>
            </View>);
    case 'screen2':
      return <WatchVideoScreen navigate={navigate} routeparams={screenParams}/>;
    case 'screen3':
      return (<View style={{flex:1}} navigate={navigate}>
                <HeaderComponent profilepic={profiledata}/>
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                   <Image source={require('../../assets/biki.png')} style={{width:100, height:100}}/>
                   <Text style={{color:'#000'}}>App is working fine! there's some issue with YouTube</Text>
                  </View>
             </View>);  
    default:
      return null;
  }
};



const navigate = (screenName) => {
  setCurrentScreen(screenName);
};

const routeparams = (params) => {
  setScreenParams(params)
}

const ApiCheck = () => {
  if(CardData === undefined){
    setCurrentScreen('screen1')
  }else{
    setCurrentScreen('screen3')
  }
}

//return renderScreen();

     
  return (
    renderScreen()
  )
}

export default Screen1