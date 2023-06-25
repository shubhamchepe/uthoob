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
import {useSelector, useDispatch} from 'react-redux';
import {toggle} from '../redux/slices/AudioPlayer';

const WatchVideoScreen = ({navigate, routeparams}) => {
  //const Url = 'SImyUKhAwzs'
  const Url = routeparams;
  const youtubeURL = `http://www.youtube.com/watch?v=${Url}`;
  const [playing, setPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [meta, setMeta] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [AudioUrl,setAudioUrl] = useState('')
  const [playlist, setPlaylist] = useState([]);
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
          Alert('File Downloaded');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const YoutubAudio = async () => {
    try {
      let info = await ytdl.getInfo(Url);
      let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      //console.log('Youtube Audio', audioFormats[0].url);
      setAudioUrl(audioFormats[0].url)
    } catch (err) {
      console.log(err);
    }
  };

  const setup = async () => {
    await TrackPlayer.setupPlayer();
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
    await TrackPlayer.reset();
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
  };

  const togglePlayback = async () => {
  
    const playbackState = await TrackPlayer.getState();
    console.log('Top', playbackState);
    try {
      if (playbackState === State.Paused) {
        console.log('Paused', playbackState);
        await TrackPlayer.play();
        setIsPlaying(true);
      } else if (playbackState === State.Playing || playbackState === State.Buffering) {
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

  const onStateChange = useCallback(
    (state) => {
      if (state === 'ended') {
        setPlaying(false);
        Alert.alert('Completed', 'Watching video Completed', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    },
    []
  );

  const GetMeta = async () => {
    await getYoutubeMeta('sNhhvQGsMEc').then(meta => {
      setMeta(meta)
    });
  }

 

  useEffect(() => {
    if(!toggleState){
      setup();
      YoutubAudio().then(()=>{
        GetMeta();
      }).then(()=>{
        loadPlaylist();
      })
      
      
    }else{
      YoutubAudio().then(()=>{
        GetMeta();
      }).then(()=>{
        loadPlaylist();
      })
    }
    
    

    return () => {
      TrackPlayer.remove(playlist.map((track) => track.id));
    }
  },[]);


  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          backgroundColor: '#fff',
          borderWidth: 5,
          borderColor: 'red',
          height: '30%',
          width: '100%',
        }}>
        <YoutubePlayer
          height="100%"
          play={playing}
          videoId={Url}
          onChangeState={onStateChange}
        />
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          borderWidth: 5,
          borderColor: 'green',
          height: '20%',
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderWidth: 5,
            borderColor: 'pink',
            height: '60%',
            width: '100%',
          }}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '700'}}>
            {meta.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderWidth: 5,
            borderColor: 'orange',
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
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/download.png')}
              style={{width: '90%', height: '50%'}}
            />
            <Text style={{color: '#000', fontSize: 10, fontWeight: '700'}}>
              720P
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/download.png')}
              style={{width: '70%', height: '50%'}}
            />
            <Text style={{color: '#000', fontSize: 10, fontWeight: '700'}}>
              1080P
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          borderWidth: 5,
          borderColor: 'yellow',
          height: '50%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <TouchableOpacity
            onPress={() => {togglePlayback()}}
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
