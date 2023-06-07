import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {fetchVideos} from '../../redux/slices/VideoParams';

const VideoCard = ({props,SomeOtherProps}) => {
  const dispatch = useDispatch();
  const videos = useSelector(state => state);
  //console.log('Video Card Screen',videos.VideoParams.data[0].id.videoId);
  const {height, width} = useWindowDimensions();
  return (
    <ScrollView>
      {videos.VideoParams.data == null ? <Text style={{color:'#000',textAlignVertical:'center'}}>Select Subs To See Videos</Text> : videos.VideoParams.data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {SomeOtherProps.navigate('WatchVideoScreen',{Url:item.id.videoId})}}>
          <Animatable.View
            animation={'fadeInUp'}
            duration={1000}
            delay={300}
            style={{marginTop: 25}}
            key={index}>
            <Image
              source={{uri: item.snippet.thumbnails.default.url}}
              style={{width: width, height: 200}}
            />
            <View style={{flexDirection: 'row', margin: 5}}>
              <Image
                source={{uri: item.snippet.thumbnails.default.url}}
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
                <Text style={{color: '#000'}}>{item.id.videoId}</Text>
              </View>
            </View>
          </Animatable.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default VideoCard;
