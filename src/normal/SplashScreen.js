import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';
import moment from 'moment';
import {refresh} from 'react-native-app-auth';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import {CLIENT_ID,API_KEY} from '@env';


const SplashScreen = ({navigation}) => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [UpdateData, SetUpdateData] = useState({});
  useEffect(() => {
    isSignedIn();
  });

  const {height, width} = useWindowDimensions();

  const config = {
    clientId: CLIENT_ID,
    redirectUrl: 'com.uthoob.app:/callback',
    scopes: [
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'offline_access',
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    },
  };

  const isSignedIn = async () => {
    const version = await firestore().collection('versions').get();
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setLoggedIn(true);
        const something = JSON.parse(credentials.username);
        //var date = new Date(something.ExpirationTime);
        //var timeFormat = moment(date).format('HH:mm A');
        const headers = {
          Authorization: `Bearer ${something.InitialAccessToken}`,
        }; // auth header with bearer token
        fetch(
          `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&key=${API_KEY}`,
          {headers},
        )
          .then(response => response.json())
          .then(async resp => {
            if (resp.items == undefined) {
              await Keychain.resetGenericPassword();
              navigation.navigate('LoginScreen', {modal: version.docs[0]._data});
            } else {
              navigation.navigate('ParentScreen', {
                access: something.InitialAccessToken,
              });
            }
            //console.log(resp.items);
          })
          .catch(err => console.log('Error from Get Sub Screen 1', err));
      } else {
        //console.log('No credentials stored');
        setLoggedIn(false);
        navigation.navigate('LoginScreen', {modal: version.docs[0]._data});
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
    //await Keychain.resetGenericPassword();

    // if (credentials) {
    //   console.log(
    //     'Credentials successfully loaded for user ' +
    //       credentials.InitialAccessToken,
    //   );
    //   setLoggedIn(true);
    //   //navigation.navigate('ParentScreen',{access:credentials.InitialAccessToken});
    // } else {
    //   console.log('No credentials stored');
    //   setLoggedIn(false);
    //   navigation.navigate('LoginScreen');
    // }

    // console.log("Checking...")
    // const isSignedIn = await GoogleSignin.isSignedIn();
    // if(isSignedIn == true){
    //   setLoggedIn(true)
    //   console.log('if isLoggedin TRUE')
    //   const currentUser = await GoogleSignin.getCurrentUser();
    //   console.log('Get Current User',currentUser)

    //   navigation.navigate('ParentScreen')
    // } else{
    //   setLoggedIn(false)
    //   console.log('if isLoggedin FALSE')
    //   navigation.navigate('LoginScreen')
    // }
    //console.log(isSignedIn)
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/play-button.png')}
        style={styles.logo}
      />
      <Text style={styles.title_text}>UTHOOB</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 50,
  },
  title_text: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 10,
    color: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
  },
  btn: {
    backgroundColor: '#086972',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  btn_text: {
    fontSize: 23,
    color: '#fff',
  },
});

export default SplashScreen;
