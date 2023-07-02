import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  ToastAndroid,
  Alert
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import YoutubePlayer, {getYoutubeMeta} from 'react-native-youtube-iframe';
import ytdl from 'react-native-ytdl';
import RNFetchBlob from 'rn-fetch-blob';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
  State,
  AppKilledPlaybackBehavior,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import Orientation from '@imonk777/react-native-orientation-locker';
import {useSelector, useDispatch} from 'react-redux';
import {toggle} from '../redux/slices/AudioPlayer';

const WatchVideoScreen = ({navigate, routeparams,pops,routefunc,NavProps}) => {
console.log(pops.route.params.Url)
  const goToScreen1 = () => {
    navigate('screen1');
    routefunc(routeparams);
  };
  //const Url = 'SImyUKhAwzs'
  const Url = routeparams || pops.route.params.Url || '';
  const youtubeURL = `http://www.youtube.com/watch?v=${Url}`;
  const [playing, setPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [meta, setMeta] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [AudioUrl,setAudioUrl] = useState('')
  const [playlist, setPlaylist] = useState([]);
  const [isLandscape, setIsLandscape] = useState(false);
  const dispatch = useDispatch();
  const toggleState = useSelector(state => state.toggle);
  const playbackState = usePlaybackState();

  const showToastWithGravity = err => {
    ToastAndroid.showWithGravity(
      `${err}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const toggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsLandscape(!isLandscape);
  };

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
        showToastWithGravity('Permission Granted');
        DownloadVideo();
      } else {
        showToastWithGravity('Problem Occured');
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
          Alert.alert('File Downloaded');
        });
    } catch (err) {
      showToastWithGravity(err);
    }
  };

  const YoutubAudio = async () => {
    try {
      let info = await ytdl.getInfo(Url);
      let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      //console.log('Youtube Audio', audioFormats[0].url);
      setAudioUrl(audioFormats[0].url)
    } catch (err) {
      showToastWithGravity(err);
    }
  };

  const setup = async () => {
    try{
      await TrackPlayer.setupPlayer();
    }catch(error){
      console.log(error)
    }
    GetMeta(Url);
    dispatch(toggle());
    //await TrackPlayer.add(songs);
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      stopWithApp: true,
      waitForBuffer: true,
    });
  };

  const loadPlaylist = async () => {
    GetMeta(Url);
    try{
      await TrackPlayer.remove();
    }catch(error){
      console.log(error)
    }
    
    const playlistData = [
      {
        id: '1',
        url: AudioUrl,
        title: meta.title,
        artist: meta.author_name,
      },
      // ... other tracks
    ];
    try{
      await TrackPlayer.add(playlistData);
      setPlaylist(playlistData);
    }catch(err){
      console.log(err)
    }
    
    
  };

  const togglePlayback = async () => {
    const playbackState = await TrackPlayer.getState();
    console.log('Top', playbackState);
    try {
      if (playbackState === 'paused') {
        console.log('Paused', playbackState);
        await TrackPlayer.play();
        setIsPlaying(true);
      } else if (playbackState === 'playing' || playbackState === 'buffering') {
        console.log('Playing', playbackState);
        await TrackPlayer.pause();
        setIsPlaying(false);
      } else {
        console.log('Else', playbackState);
        const playlistData = [
          {
            id: '1',
            url: AudioUrl,
            title: meta.title,
            artist: meta.author_name,
          },
          // ... other tracks
        ];
        await TrackPlayer.add(playlistData);
        setPlaylist(playlistData);
        await TrackPlayer.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in togglePlayback:', error);
    }
  };

  // const onStateChange = useCallback(
  //   (state) => {
  //     if (state === 'ended') {
  //       setPlaying(false);
  //       Alert.alert('Completed', 'Watching video Completed', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {text: 'OK', onPress: () => console.log('OK Pressed')},
  //       ]);
  //     }
  //   },
  //   []
  // );

  const GetMeta = async (Url) => {
    await getYoutubeMeta(Url).then(meta => {
      setMeta(meta)
    }).catch((e)=>console.log(e))
    await YoutubAudio();
  }

 

  useEffect(() => {
    if(!toggleState){
     setup();
    }else{
    loadPlaylist();
    }

    return  () => {
      try{
        TrackPlayer.remove();
      }catch(err){
        console.log(err)
      }
    }
  },[]);

  useEffect(() => {
    
    if (routeparams !== undefined) {
      console.log('Back Action Also Ran')
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => navigate('screen1') },
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => {
        backHandler.remove();
      };
    }
  }, [routeparams]);


  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          backgroundColor: '#fff',
          //borderWidth: 5,
          //borderColor: 'red',
          height: '30%',
          width: '100%',
        }}>
        <YoutubePlayer
          height="100%"
          play={playing}
          videoId={Url}
          //onChangeState={onStateChange}
          onFullScreenChange={toggleOrientation}
        />
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          //borderWidth: 5,
          //borderColor: 'green',
          height: '20%',
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            //borderWidth: 5,
            //borderColor: 'pink',
            height: '60%',
            width: '100%',
          }}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '700',marginLeft:10,marginTop:8}} ellipsizeMode="tail" numberOfLines={2}>
            {meta.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            //borderWidth: 5,
            //borderColor: 'orange',
            height: '40%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                GetPermission();
              }}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/download.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <Text style={{color: '#000', fontSize: 10, fontWeight: '700'}}>
              Download
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          //borderWidth: 5,
          //borderColor: 'yellow',
          height: '50%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <TouchableOpacity
          onPress={() => togglePlayback()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              height: '30%',
            }}>
              {isPlaying ? <Image
              source={require('../../assets/pause-black.png')}
              style={{width: '40%', height: '60%'}}
            /> : <Image
              source={require('../../assets/play-black.png')}
              style={{width: '40%', height: '60%'}}
            />}
          </TouchableOpacity>
        )}
        <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
          Play Audio In Background
        </Text>
      </View>
    </View>
  );
};

export default WatchVideoScreen;
