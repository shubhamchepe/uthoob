import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import ytdl from 'react-native-ytdl';
import RNFetchBlob from 'rn-fetch-blob';

const WatchVideoScreen = ({route, navigation}) => {
  const {Url} = route.params;
  const youtubeURL = `http://www.youtube.com/watch?v=${Url}`;

  const GetPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'UTHOOB PERMISSION',
          message:
            'UTHOOB App needs access to your storage ' +
            'so you can save videos offline.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DownloadVideo();
      } else {
        DownloadVideo();
        //console.log('Download permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const DownloadVideo = async () => {
    const {config, fs} = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;
    const date = new Date();
    
    try {
      const resp = await ytdl(youtubeURL, {quality: 'highest'});
      console.log(resp[0].url);
     
      config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            fileDir +
            '/download_' +
            Math.floor(date.getDate() + date.getSeconds() / 2) +
            '.mp4',
          description: 'Downloading Your Youtube Video',
        },
      })
        .fetch('GET', `${resp[0].url}`, {
          //some headers ..
        })
        .then(res => {
          // the temp file path
          console.log('The file saved to ', res.path());
          alert('File Downloaded');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View style={{flex: 1}}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={Url}
        onChangeState={onStateChange}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            height: 30,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            GetPermission();
          }}>
          <Text style={{color: '#000'}}>Download This Video</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
    </View>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: 200,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default WatchVideoScreen;
