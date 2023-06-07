import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const SplashScreen = ({navigation}) => {
  const [LoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    isSignedIn();
  }, []);

  const isSignedIn = async () => {

    console.log("Checking...")
    const isSignedIn = await GoogleSignin.isSignedIn();
    if(isSignedIn == true){
      setLoggedIn(true)
      console.log('if isLoggedin TRUE')
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('Get Current User',currentUser)
     
      navigation.navigate('ParentScreen')
    } else{
      setLoggedIn(false)
      console.log('if isLoggedin FALSE')
      navigation.navigate('LoginScreen')
    }
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
