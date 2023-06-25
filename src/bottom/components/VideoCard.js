import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ToastAndroid
} from 'react-native';
import React, {useEffect, useState,useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {fetchVideos} from '../../redux/slices/VideoParams';
import { useScrollToTop } from '@react-navigation/native';
import WatchVideoScreen from '../WatchVideoScreen';

const VideoCard = ({props,SomeOtherProps,navigate,routeparams}) => {
  const goToScreen2 = (params) => {
    navigate('screen2');
    routeparams(params)
  };
  const dispatch = useDispatch();
  const videos = useSelector(state => state.VideoParams);
  //console.log('VideoParams:',videos.data[0].snippet.channelTitle);
  const Subs = useSelector(state => state.subsdata)
  //console.log('Subs Redux', Subs.data[0].snippet.title)
  //const [currentScreen, setCurrentScreen] = useState('screen1');





  const showToastWithGravity = (err) => {
    ToastAndroid.showWithGravity(
      `${err}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const findDp = (param) => {
    const channelTitle = param;
const matchingIndex = Subs.data.findIndex(
  (sub) => sub.snippet.title === channelTitle
);

let thumbnailUrl = 'https://img.icons8.com/?size=512&id=21196&format=png';

if (matchingIndex !== -1) {
  thumbnailUrl = Subs.data[matchingIndex].snippet.thumbnails.medium.url;
}

return thumbnailUrl;
  }

 
  //const modifiedArray = videos.VideoParams.data.map((innerArray) => [...innerArray, newItem]);
  //console.log('Video Card Screen',videos.VideoParams.data[0]);
  const {height, width} = useWindowDimensions();
  const ref = useRef();
  const onPressTouch = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }
  onPressTouch();

  
  return (
    <ScrollView ref={ref}>
      {videos.data === undefined || videos.data === null ? (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       <Image source={require('../../../assets/shiba.png')} style={{width:'40%', height:'60%'}}/>
      </View>
      ) : videos.data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            goToScreen2(item.id.videoId);

          }}>
          <Animatable.View
            animation={'fadeInUp'}
            duration={1000}
            delay={300}
            style={{marginTop: 5}}
            key={index}>
            <Image
              source={{uri: item.snippet.thumbnails.high.url}}
              style={{width: width, height: 200}}
            />
            <View style={{flexDirection: 'row', margin: 5}}>
              <Image
                source={{uri: findDp(item.snippet.channelTitle)}}
                style={{width: 30, height: 30, borderRadius: 50}}
              />
              <View style={{marginLeft: 10, width: width - 40}}>
                <Text
                  style={{color: '#000', fontSize: 15, fontWeight: '600'}}
                  ellipsizeMode="tail"
                  numberOfLines={2}>
                  {item.snippet.title}
                </Text>
                <Text style={{color: '#000'}}>{item.snippet.channelTitle}</Text>
                {/* <Text style={{color: '#000'}}>{item.id.videoId}</Text> */}
              </View>
            </View>
          </Animatable.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default VideoCard;
