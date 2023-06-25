import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState,useRef} from 'react';
import users from '../../data/UserData.json';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import {fetchVideos} from '../../redux/slices/VideoParams';
import AsyncStorage from '@react-native-async-storage/async-storage';




const SubscriptionComponent = ({props,tokenProp}) => {
//console.log('Subscription',props)
  //const Token = tokenProp;
  const dispatch = useDispatch();
  //const videos = useSelector(state => state);
  //console.log('from Subscribe Component', typeof tokenProp);
  //const Subs = useSelector(state => state.subsdata)
  const {height, width} = useWindowDimensions();
  
  //console.log( 'Shubham Chepe Props :',props[0].snippet.resourceId.channelId)

  useEffect(() => {
    if (props && props[0] && props[0].snippet) {
      GetInitialSubVideos();
    }
  },[props])

  const getMyStringValue = async (key) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch(e) {
      console.log(e)
    }
  }

const GetInitialSubVideos = async () => {
  if (props && props[0] && props[0].snippet) {
    const resourceId = props[0].snippet.resourceId.channelId;
    const Obj = { A: resourceId, B: tokenProp };
    dispatch(fetchVideos(Obj));
  }
};


  return (
    <Animatable.View
      animation={'fadeInLeft'}
      duration={1000}
      delay={300}
      style={{height: '15%'}}>
      {/* <Text style={{color:'#000'}}>{videos.VideoParams.data == null ? 'None' : videos.VideoParams.data.etag}</Text> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props !== undefined ? props.map((item, index) => (
          <View style={{width: 85, padding: 5}} key={index}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                const Obj = {A:item.snippet.resourceId.channelId,B:tokenProp,C:index}

                dispatch(fetchVideos(Obj));
                getMyStringValue(`searchResults_${item.snippet.resourceId.channelId}`)
              }}>
              <Image
                source={{uri: item.snippet.thumbnails.default.url}}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  borderColor: '#fff',
                  borderWidth: 4,
                }}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 10,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {item.snippet.title}
              </Text>
              {/* <Text style={{color: '#000', fontSize: 10, fontWeight: '600'}}>
                {item.contentDetails.totalItemCount}
              </Text> */}
            </TouchableOpacity>
          </View>
        )) : (<View>
          <ActivityIndicator />
        </View>)}
      </ScrollView>
    </Animatable.View>
  );
};

export default SubscriptionComponent;
