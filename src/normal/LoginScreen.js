import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Linking,
  Modal
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
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info'
import firestore from '@react-native-firebase/firestore';
import {CLIENT_ID} from '@env';





const LoginScreen = ({route,navigation}) => {
  const Version = route.params.modal.version;
  const Message = route.params.modal.message;
  const [profileName, SetprofileName] = useState('');
  const [msg,SetMsg] = useState(''); 
  

  useEffect(() => {
    
  }, []);



  const config = {
    clientId: CLIENT_ID,
    redirectUrl: 'com.uthoob.app:/callback',
    scopes: ['https://www.googleapis.com/auth/youtube.force-ssl','https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    },
    access_type: 'offline'
  };
  const signIn = async () => {
    try{
      await Keychain.resetGenericPassword();
    }catch(e){
      console.log(e)
    }
    try {
      const result = await authorize(config);
      // Access token is available in `result.accessToken`
      const { accessToken, idToken } = result;

      // Create a Google credential with the obtained tokens
    const googleCredential = auth.GoogleAuthProvider.credential(
      idToken,
      accessToken
    );

    // Sign in to Firebase with the Google credential
    await auth().signInWithCredential(googleCredential);
       
      if(result.accessToken){
        console.log('LoginScreen',result)
        const ResultObj = {
          InitialAccessToken : result.accessToken,
        ExpirationTime : result.accessTokenExpirationDate,
        RefreshToken : result.refreshToken
        }
        const Srtingify = JSON.stringify(ResultObj)
        await Keychain.setGenericPassword(Srtingify,result.tokenType);
        try {
          // Retrieve the credentials
          const credentials = await Keychain.getGenericPassword();
          if (credentials) {
            
              const currentUser = auth().currentUser;
          
          if (currentUser) {
            // User is signed in
            const { uid, displayName, email, photoURL } = currentUser;
            SetprofileName(currentUser.displayName);
            // Access the user's data
            console.log('User ID:', uid);
            console.log('Display Name:', displayName);
            console.log('Email:', email);
            console.log('Photo URL:', photoURL);
          } else {
            // No user is signed in
            console.log('No user is signed in.');
          }
          
            navigation.navigate('PaymentScreen',{access:result.accessToken,username:currentUser.displayName,userdata:currentUser})
          } else {
            console.log('No credentials stored');
          }
        } catch (error) {
          //console.log("Keychain couldn't be accessed!", error);
          await Keychain.resetGenericPassword();
        }
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };
  
  
  // const signIn1 = async () => {
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
  //console.log(count);
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
      {DeviceInfo.getVersion() !== Version ? (
    <Modal visible={true}>
    <View style={{width:width,height:height,position:'absolute',top:0,backgroundColor:'rgba(0,0,0,.5)',alignItems:'center',justifyContent:"center"}}>
      <View style={{width:'90%',backgroundColor:'#fff',borderRadius:20}}>
         <Text style={{alignSelf:'center',marginTop:30,textAlign:'center',color:'#000',fontSize:18,fontWeight:'700'}}>
          {'New App Version ' + Version + ' Available'}
         </Text>
         <View style={{width:'80%',backgroundColor:'#93F98D',borderRadius:20,padding:20,alignSelf:'center',marginTop:30}}>
             <Text style={{color:'#000',textAlign:'center'}}>{Message}</Text>
         </View>
         <TouchableOpacity style={{width:'60%',height:50,backgroundColor:'#0CDD00',borderRadius:8,marginBottom:30,marginTop:20,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'#fff',fontSize:18,fontWeight:'700'}}>Update Now</Text>
         </TouchableOpacity>
      </View>
    </View>
  </Modal>
          ) : (
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
          )}
        
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
