import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Image,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
  useColorScheme
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {API_KEY,NOTIF_SERVER_KEY} from '@env';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';
import {Firebase} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setWatchlist, removeWatchlist} from '../redux/slices/WatchList';
import BackgroundService from 'react-native-background-actions';

const Screen2 = ({props, NavigationProps, AccessToken}) => {
  const token = AccessToken;
  const [searchText, setSearchText] = useState('');
  const [TimeInterval, SetTimeInterval] = useState('');
  const [btn, Setbtn] = useState(true);
  const [NotfBtn, SetNotfBtn] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [searchResults, setSearchResults] = useState([]);
  const [search, SetSearch] = useState(true);
  const [initialWatchlist, SetInitialWatchlist] = useState([]);
  const [NotificationItem,SetNotificationItem] = useState('');
  const [deviceToken, SetDeviceToken] = useState('');
  const notificationTimestamp = new Date(Date.now() + 1 * 60000);
  const usersCollection = firestore().collection('users');
  const watchList = useSelector(state => state.watchList.watchList);
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
  let Title = '';
  const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
             console.log(NotificationItem)
            sendNotificationToDevice(deviceToken,Title, 'Remember to finish watching your video')
            await sleep(delay);
        }
    });
};

const options = {
  taskName: 'Notification service running in background',
  taskTitle: 'in sync for videos to be notified',
  taskDesc: '...',
  taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
      delay: 60000 * TimeInterval, //60000 = 60 secs
  },
};

const StartBackgroundService = async () => {
  
  await BackgroundService.start(veryIntensiveTask, options);
await BackgroundService.updateNotification({taskDesc: '...'}); // Only Android, iOS will ignore this call
}

const StopBgService = async () => {
  await BackgroundService.stop();
}

  const sendNotificationToDevice = async (deviceToken, title, body) => {
    const serverKey = NOTIF_SERVER_KEY; // Your FCM server key
    const url = 'https://fcm.googleapis.com/fcm/send';
  
    const payload = {
      to: deviceToken,
      notification: {
        title: title,
        body: body,
      }
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
      },
      body: JSON.stringify(payload),
    };
  
    try {
      const response = await fetch(url, options);
      console.log('Notification sent:', response.status);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleSearch = () => {
    const headers = {Authorization: `Bearer ${token}`};
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchText}&key=${API_KEY}`,
      {headers},
    )
      .then(response => response.json())
      .then(resp => {
        if (initialWatchlist.length !== 0) {
        }
        const filteredData = resp.items.filter(item => item.id.kind !== 'youtube#channel');
        setSearchResults(filteredData);
        Setbtn(true);
        
        //console.log(filteredData);
      })
      .catch(err => {
        setSearchResults(null);
      });
  };

  const getWatchlist = () => {
    const userId = auth().currentUser.uid;
    const watchlistRef = usersCollection.doc(userId).collection('watchlist');

    return watchlistRef
      .get()
      .then(snapshot => {
        const watchlist = [];
        snapshot.forEach(doc => {
          const video = doc.data();
          watchlist.push(video);
        });
        setSearchResults(watchlist);
        SetInitialWatchlist(watchlist);
        dispatch(setWatchlist(watchlist));
        //console.log('Get Initial Watchlist', watchlist);
        if (watchlist.length == 3) {
          SetSearch(false);
        }
        Setbtn(false);
        return watchlist;
      })
      .catch(error => {
        console.error('Error retrieving watchlist:', error);
        return [];
      });
  };

  const saveToWatchlist = (videoId, data) => {
    const userId = auth().currentUser.uid; // Assuming you have user authentication
    const watchlistRef = usersCollection.doc(userId).collection('watchlist');

    watchlistRef
      .doc(videoId)
      .set(data)
      .then(() => {
        console.log('Video added to watchlist');
      })
      .catch(error => {
        console.error('Error adding video to watchlist:', error);
      });
  };

  const removeFromWatchlist = videoId => {
    const userId = auth().currentUser.uid;
    const watchlistRef = usersCollection.doc(userId).collection('watchlist');

    watchlistRef
      .doc(videoId)
      .delete()
      .then(() => {
        console.log('Video removed from watchlist');
      })
      .catch(error => {
        console.error('Error removing video from watchlist:', error);
      });
  };

  const handleInputChange = text => {
    if (search) {
      setSearchText(text);
    } else {
      showToastWithGravity('Not More Than 3 Videos');
    }
  };

  const handleTimeChange = number => {
      SetTimeInterval(number);
  };

  const handleSearchButtonPress = () => {
    handleSearch();
  };

  const handleCancelButtonPress = () => {
    setSearchText('');
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const animateSearchBar = () => {
    setIsFocused(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const getDeviceInfo = async () => {
    let token = await messaging().getToken();
    SetDeviceToken(token)
  };

  const DeleteWatchListItem = videoid => {
    const remaining = searchResults.filter(item => item.id.videoId != videoid);
    setSearchResults(remaining);
    SetInitialWatchlist(remaining);
    dispatch(removeWatchlist({id: videoid}));
    SetSearch(true);
  };

  const showToastWithGravity = err => {
    ToastAndroid.showWithGravity(
      `${err}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const scheduleNotification = async (title, body, timestamp) => {
    await messaging().scheduleNotification({
      title: title,
      body: body,
      fireDate: timestamp.toISOString(),
      repeatInterval: 'day', // Adjust as per your requirements
    });
  };

  const GetPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'ASKING FOR PERMISSION',
          message:
            'UTHOOB App needs your permission to send you notifications ' +
            'so that you can be reminded for pending videos in watchlist',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getDeviceInfo();
      } else {
        showToastWithGravity('PERMISSION IS REQUIRED');
        //console.log('Download permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    animateSearchBar(); // Trigger the animation when the component mounts
    GetPermission();
    getWatchlist();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert(
  //       'A new FCM message arrived! Foreground',
  //       JSON.stringify(remoteMessage),
  //     );
  //   });

  //   return unsubscribe;
  // }, []);

  const searchBoxStyle = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [250, 0],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container,{backgroundColor:isDarkMode ? '#282828' : '#fff'}]}
      behavior={Platform.OS === 'ios' ? 'height' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <View style={[styles.header,{backgroundColor:isDarkMode ? '#282828' : '#fff',borderBottomColor: isDarkMode ? '#282828' : '#ccc',}]}>
        <Animated.View style={[styles.searchBox, searchBoxStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#27a844"
            value={searchText}
            onChangeText={handleInputChange}
            onFocus={animateSearchBar}
            onSubmitEditing={handleSearchButtonPress}
            editable={search ? true : false}
          />
          <TouchableWithoutFeedback
            onPress={handleSearchButtonPress}
            disabled={search ? true : false}>
            <View style={styles.searchButton}>
              <Image
                source={require('../../assets/search.png')}
                style={{width: 30, height: 30}}
              />
            </View>
          </TouchableWithoutFeedback>
          {isFocused && (
            <TouchableWithoutFeedback onPress={handleCancelButtonPress}>
              <View style={styles.cancelButton}>
                <Image
                  source={require('../../assets/cross.png')}
                  style={{width: 30, height: 30}}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </Animated.View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.searchResultsContainer,{backgroundColor: isDarkMode ? '#282828' : '#fff'}]}
        keyboardShouldPersistTaps="handled">
        {searchResults !== undefined ? (
          searchResults.map(item => (
            <TouchableOpacity
              key={item.etag}
              onPress={() => {
                NavigationProps.navigate('WatchVideoScreen', {
                  Url: item.id.videoId,
                });
              }}>
              <View style={[styles.card,{backgroundColor: isDarkMode ? '#545454' : '#fff',}]}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Image
                    source={{uri: item.snippet.thumbnails.default.url}}
                    style={styles.thumbnail}
                  />
                  <View style={{marginTop: 10, flexDirection: 'row'}}>
                    <TextInput
                      //value={TimeInterval}
                      keyboardType="numeric"
                      placeholder="1,2,3..."
                      placeholderTextColor="#000"
                      onChangeText={handleTimeChange}
                      style={{
                        width: 50,
                        height: 28,
                        borderColor: '#000',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginBottom: 5,
                        paddingBottom: 2,
                        marginLeft:5,
                        color:'#000',
                        backgroundColor:'#fff',
                        fontWeight:'600'
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: NotfBtn ? 'green' : '#666666',
                        borderRadius: 2,
                        marginLeft: 10,
                        marginBottom: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 35,
                        borderRadius:10
                      }}
                      disabled={NotfBtn ? false : true}
                      onPress={()=>{
                        //scheduleNotification(item.snippet.title,'REMINDER TO WATCH VIDEO',notificationTimestamp)
                        Title = item.snippet.title
                        StartBackgroundService(Title);
                        SetNotfBtn(false)

                      }}
                      >
                      <Text style={{fontWeight: '600', color: '#fff'}}>
                        SET
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: 2,
                        marginLeft: 10,
                        marginBottom: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                      }}
                      onPress={()=>{
                        StopBgService();
                        SetNotfBtn(true)
                        showToastWithGravity('Alerts are stopped')
                      }}
                      >
                          <Image
                    source={require('../../assets/silent.png')}
                    style={{width:25,height:25}}
                  />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <Text style={[styles.title,{color: isDarkMode ? '#fff' : '#282828'}]}>{item.snippet.title}</Text>
                  <Text style={[styles.channel,{color: isDarkMode ? '#fff' : '#282828'}]}>
                    {item.snippet.channelTitle}
                  </Text>
                </View>
                <View style={{marginTop:3,marginRight:3}}>
                  {btn === true ? (
                    <TouchableOpacity
                      onPress={async () => {
                        if (!(watchList.length > 2)) {
                          //setSearchResults([]);
                          dispatch(setWatchlist(item));
                          setSearchResults([...watchList, item]);
                          Setbtn(false);
                          saveToWatchlist(item.id.videoId, item);
                        } else {
                          Setbtn(false);
                          setSearchResults(watchList);
                          showToastWithGravity('Not More Than 3 Videos');
                          console.log(watchList);
                        }
                      }}>
                      <Image
                        source={require('../../assets/add.png')}
                        style={{width: 30, height: 30}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={async () => {
                        DeleteWatchListItem(item.id.videoId);
                        removeFromWatchlist(item.id.videoId);
                      }}>
                      <Image
                        source={require('../../assets/remove.png')}
                        style={{width: 30, height: 30}}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 150,
            }}>
            <Image
              source={require('../../assets/shiba.png')}
              style={{width: 100, height: 100}}
            />
            <Text style={{color: '#000'}}>Issue With YouTube</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f7f5f5',
    width: 300,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    color: '#000',
  },
  searchButton: {
    padding: 5,
    marginLeft: 10,
    backgroundColor: '#ccc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    padding: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  searchResultsContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius:15,
    marginTop:3,
    marginLeft:3
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: -5,
  },
  channel: {
    fontSize: 11,
    marginBottom: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  views: {
    fontSize: 12,
    color: '#555',
  },
  duration: {
    fontSize: 12,
    color: '#555',
  },
});

export default Screen2;
