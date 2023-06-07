import { View, Text,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from './components/HeaderComponent'
import SubscriptionComponent from './components/SubscriptionComponent'
import VideoCard from './components/VideoCard'
import axios from 'axios';







const Screen1 = ({props,NavigationProps}) => {
  //console.log(NavigationProps)
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwODNkZDU5ODE2NzNmNjYxZmRlOWRhZTY0NmI2ZjAzODBhMDE0NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDgzOTI4NjEyNzItbmx0ODlia25yMzdnMGJnNmdoMzBzOWFkZGE2OG9pdGUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDgzOTI4NjEyNzItNGZqY2RnYnYybjExNDVtc291MnJhMWZzdG85aHJtbXQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTMxMTIwMTYwMjQxODkyOTM3MzciLCJlbWFpbCI6ImhlbWFudGNoZXBlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU2h1YmhhbSBDaGVwZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRjdTFDbTZVZVc5V2R2UEZCQ2EzSHNlUmZjY3NWTTBsb0VGWGZzLWx3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNodWJoYW0gQ2hlcGUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY4NjA1Nzk3OCwiZXhwIjoxNjg2MDYxNTc4fQ.dEUfjuseySoNBojiOrV9NZFaMKinzL6_rgEymQXT5TWxFAsjCZByuiEO5xfVKulj_0FP3hr3KN3FyYAOsY3oxDfpmf2QMUMinvxcPpLJ_K48MA48ZYZ7Gr4LdxNeSyipjYJrfGrjl1TKlBMqhwTC4IJDrMhdGjlIu5bB3vmKYjYA06JsVA_Y1l9TAYOOBhtFbZ_AguoV4atbfk2cTC9VLwJlTKmbnCH1MhiUjooLb2q438VwvrPQV_MNZWZVOigoZZ9NQzbCth0iXmC1NzP9uP7MlZlT8UjTr-lVddKU4tqwieawmxNcAfuDKDH_AFIIFDOEIdhYh9vxBL-boGMgEg";
  const [CardData,SetCardData] = useState([]);
  const [VideoData,SetVideoData] = useState([]);

  // const optionsForGettingSubs = {
  //   method: 'GET',
  //   url: 'https://youtube.googleapis.com/youtube/v3/subscriptions?mine=true&key=AIzaSyC0ARIY_t8yYMM2RfO-gM24ETOmzYes5cc',
  //   params: {
  //     part: 'snippet,contentDetails',
  //     channelId: 'UCMy7Cj-LHsIZnqpVJJdwIyA',
  //     maxResults: '30',
  //     order: 'relevance'
  //   },
  //   headers: {
  //     'Content-type': 'application/json',
  //      'Authorization': `Bearer ${token}`,
  //   }
  // };
  
  const GetSubs = async () => {
    const headers = { 'Authorization': `Bearer ${token}` }; // auth header with bearer token
    fetch('https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&mine=true&key=AIzaSyC0ARIY_t8yYMM2RfO-gM24ETOmzYes5cc', { headers })
    .then(response => response.json()).then(resp => console.log(resp))
  //   try {
  //   const response = await axios.request(optionsForGettingSubs);
  //  console.log('Get Subs',response);
  //   SetCardData(response.data.items)
  // } catch (error) {
  //   console.error('Error From Get Subs',error);
  // }
}

const options = {
  method: 'GET',
  url: 'https://youtube-v311.p.rapidapi.com/search/',
  params: {
    part: 'snippet',
    channelId: 'UC7dLvCYNwhYe-l__yczFp1Q',
    maxResults: '50',
    order: 'date',
    safeSearch: 'moderate',
    type: 'video,channel,playlist'
  },
  headers: {
    'X-RapidAPI-Key': '2b0424bbf6msh9a933d40c813bbbp1b475bjsn2606ff9b0067',
    'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
  }
};

const GetVideos = async () => {
  try {
    const response = await axios.request(options);
    console.log('Get Vdos',response);
    SetVideoData(response.data.items)
  } catch (error) {
    console.error('Error From Get Vdos',error);
  }
}


useEffect(() => {
  GetSubs().then(GetVideos());
}, []);
     
  return (
    <View style={{flex:1}}>
      <HeaderComponent/>
      <SubscriptionComponent props={CardData}/>
      <VideoCard SomeProp={props} SomeOtherProps={NavigationProps}/>
    </View>
  )
}

export default Screen1