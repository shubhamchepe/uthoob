import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Button,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {MotiView} from 'moti/build';
import {Easing} from 'react-native-reanimated';
import {setupPlayer, addTrack} from '../../service';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
  State,
  AppKilledPlaybackBehavior,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {songs} from '../data/MusicData';
import {useSelector, useDispatch} from 'react-redux';
import {toggle} from '../redux/slices/AudioPlayer'


const _color = '#6E03EF';
const _size = 80;

const Screen3 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState();
  const [isPlayerReady, setPlayerReady] = useState(false);
  const dispatch = useDispatch();
  const toggleState = useSelector(state => state.toggle);

  useEffect(() => {
    if(!toggleState){
      setup();
    }else{
      loadPlaylist();
    }
    return () => {
      TrackPlayer.remove(songs.map((track) => track.id));
    }
  },[]);

  // const checkPlayerSetup = async () => {
  //   const playerState = await TrackPlayer.getState();

  //   if (playerState === TrackPlayer.STATE_NONE || playerState === TrackPlayer.STATE_STOPPED) {
  //     console.log('Check Player Setup',playerState)
  //     console.log('Player is not set up');
  //     // Perform any necessary actions when the player is not set up
  //     setup();
  //   } else {
  //     console.log('Player is already set up');
  //     // Perform any necessary actions when the player is already set up
  //   }
  // };

  const handleToggle = () => {
    dispatch(toggle());
  };

  useTrackPlayerEvents([Event.PlaybackQueueEnded], () => {
    // Queue has ended, restart the player
    TrackPlayer.skip(0);
  });

  // useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
  //   switch (event.type) {
  //     case Event.PlaybackTrackChanged:
  //       const playingtrack = await TrackPlayer.getTrack(event.nextTrack);
  //       setTrack(playingtrack);
  //       break;

  //     default:
  //       break;
  //   }
  // });

  const playbackState = usePlaybackState();

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  // const togglePlayback = async playbackState => {
  //   console.log(playbackState);
  //   const currentTrack = await TrackPlayer.getActiveTrackIndex();
  //   console.log('Current', currentTrack);
  //   if (currentTrack !== null) {
  //     if (playbackState === State.Paused || playbackState === State.Ready) {
  //       await TrackPlayer.play();
  //     } else {
  //       await TrackPlayer.pause();
  //     }
  //   }
  // };
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
        await TrackPlayer.add(songs);
        await TrackPlayer.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error in togglePlayback:', error);
    }

    animateButton();
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
      waitForBuffer: true
    });
  };

  const loadPlaylist = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(songs);
  };

  const someFunction = async () => {
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    console.log(trackIndex);
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(`Title: ${trackObject.title}`);
  };

  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const animateButton = () => {
    Animated.timing(buttonAnimation, {
      toValue: isPlaying ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const skipBackward = () => {
    // Logic to skip to the previous song
  };

  const skipForward = () => {
    // Logic to skip to the next song
  };

  const buttonScale = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const buttonOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  // const setup = async () => {
  //   let isSetup = await setupPlayer();
  //    console.log('isSetup', isSetup);
  //   if (isSetup) {
  //     try{
  //       await addTrack();
  //     }catch(err){
  //       console.log(err)
  //     }

  //     // await TrackPlayer.updateOptions({
  //     //   // Media controls capabilities
  //     //   capabilities: [
  //     //     Capability.Play,
  //     //     Capability.Pause,
  //     //     Capability.SkipToNext,
  //     //     Capability.SkipToPrevious,
  //     //     Capability.Stop,
  //     //   ],

  //     //   // Capabilities that will show up when the notification is in the compact form on Android
  //     //   compactCapabilities: [Capability.Play, Capability.Pause],
  //     //   android: {
  //     //     // This is the default behavior
  //     //     appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
  //     //   },
  //     // });
  //   }
  //   setPlayerReady(isSetup);
  // };

  if (!toggleState) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/play_store_512.png')}
          style={styles.logo}
        />
      </View>

      {/* Album cover and other UI elements */}
      <View style={styles.albumContainer}>
        <Image
          source={require('../../assets/play_store_512.png')}
          style={styles.albumCover}
        />
        {/* Add song title, artist, progress bar, etc. */}
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={skipBackward}>
          <Text style={styles.skipButton}>{'<<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayback}>
          <Animated.View
            style={[
              styles.playButton,
              {transform: [{scale: buttonScale}], opacity: buttonOpacity},
            ]}>
            <Text style={styles.playButtonText}>
              {isPlaying ? 'Pause' : 'Play'}
            </Text>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={skipForward}>
          <Text style={styles.skipButton}>{toggleState.toString()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  logo: {
    width: 40,
    height: 40,
  },
  albumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumCover: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 32,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  skipButton: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 16,
  },
  playButton: {
    backgroundColor: '#1DB954',
    borderRadius: 50,
    padding: 16,
    elevation: 4,
  },
  playButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Screen3;
