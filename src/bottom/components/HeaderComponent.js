import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme
} from 'react-native';
import React,{useState,useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';




const HeaderComponent = ({profilepic}) => {
  //console.log(profilepic.photoURL)
  const toggleState = useSelector(state => state.toggle);
  const watchList = useSelector(state => state.watchList.watchList)
  const isDarkMode = useColorScheme() === 'dark';
  const [Profile, SetProfile] = useState({});

  const GetProfileData = () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      // User is signed in
      const { uid, displayName, email, photoURL } = currentUser;
       SetProfile(currentUser);
    }
  }

  useEffect(()=>{
    GetProfileData()
    console.log('Header',Profile.photoURL)
  },[])

  return (
    <View
      style={{
        height: '8%',
        backgroundColor: isDarkMode ? '#282828' : '#fff',
        flexDirection: 'row',
        elevation: 6
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <Image
          source={require('../../../assets/play_store_512.png')}
          style={{width: 25, height: 25,borderRadius:5}}
        />
        <Text
          style={{
            marginLeft: 10,
            fontWeight: '900',
            fontSize: 20,
            color: isDarkMode ? '#fff' : '#282828',
          }}>
          UTHOOB
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
          {Profile.photoURL === undefined || Profile.photoURL === null ? (
            <ActivityIndicator/>
          ) : (<Image
            source={{uri: Profile.photoURL}}
            style={{width: 30, height: 30, borderRadius: 20, marginRight: 10}}
          />)}
          
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComponent;
