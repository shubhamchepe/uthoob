import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Linking
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from '../redux/slices/counter';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import { WebView } from 'react-native-webview';


// GoogleSignin.configure({
//   scopes : ['https://www.googleapis.com/auth/youtube.readonly'],
//   webClientId: '608392861272-4fjcdgbv2n1145msou2ra1fsto9hrmmt.apps.googleusercontent.com'
// });
const LoginScreen = ({navigation}) => {
  const config = {
    clientId: '608392861272-jgkt08e4gik9oaj79qjrglq8on28kvud.apps.googleusercontent.com',
    redirectUrl: 'http://localhost:8081/oauth2callback',
    scopes: ['https://www.googleapis.com/auth/youtube'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    },
  };

  const signIn = async () => {
    try {
      const result = await authorize(config);
  
      // Access token is available in `result.accessToken`
      if(result.accessToken){
        navigation.navigate('ParentScreen',{access:result.accessToken})
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
      navigation.navigate('ParentScreen',{access:error})
    }
  };

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     // await GoogleSignin.signOut();
  //     const { idToken } = await GoogleSignin.signIn();
  //     console.log(idToken);
  //     // Create a Google credential with the token
  // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // // Sign-in the user with the credential
  // return auth().signInWithCredential(googleCredential);

      
  //   } catch (error) {
  //     console.log(error.code);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  const {height, width} = useWindowDimensions();
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  console.log(count);
  // const [counter, setCounter] = useState(0);
  // const handleIncreament = () => {
  //   setCounter(counter + 1);
  // };
  // const handleDecreament = () => {
  //   setCounter(counter - 1);
  // };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/play-button.png')}
        style={styles.logo}
      />
      <Text style={styles.title_text}>UTHOOB</Text>
      <Text style={styles.counter_text}>Distraction Free YouTube</Text>
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={signIn}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            margin: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: width - 50,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/google.png')}
            style={styles.google}
          />
          <Text style={styles.btn_text}> Sign In With Google </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            signIn();
          }}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: width - 50,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/google.png')}
            style={styles.google}
          />
          <Text style={styles.btn_text}> New User?, Sign Up With Google </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 50,
  },
  container1: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 1,
    justifyContent: 'flex-end',
  },
  title_text: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 1,
    color: '#fff',
  },
  google: {
    width: 20,
    height: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  counter_text: {
    fontSize: 12,
    fontWeight: '900',
    margin: 1,
    color: '#fff',
  },
  btn: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btn_text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    paddingLeft: 10,
  },
});

export default LoginScreen;
