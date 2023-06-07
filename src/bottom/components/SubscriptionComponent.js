import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import users from '../../data/UserData.json';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import {fetchVideos} from '../../redux/slices/VideoParams';

const SubscriptionComponent = ({props}) => {
  const dispatch = useDispatch();
  const videos = useSelector(state => state);
  // console.log('from Subscribe Component', props[0].snippet.channelId);
  const {height, width} = useWindowDimensions();
  // console.log( 'Shubham Chepe Props :',props[0])
  return (
    <Animatable.View
      animation={'fadeInLeft'}
      duration={1000}
      delay={300}
      style={{height: height / 7}}>
      {/* <Text style={{color:'#000'}}>{videos.VideoParams.data == null ? 'None' : videos.VideoParams.data.etag}</Text> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.map((item, index) => (
          <View style={{width: 85, padding: 5}} key={index}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                dispatch(fetchVideos(item.snippet.resourceId.channelId));
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
              <Text style={{color: '#000', fontSize: 10, fontWeight: '600'}}>
                {item.contentDetails.totalItemCount}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Animatable.View>
  );
};

export default SubscriptionComponent;
