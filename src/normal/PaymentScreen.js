import { View, Text,StyleSheet,TouchableOpacity,Image,useWindowDimensions,Linking } from 'react-native'
import React,{useEffect,useState} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const PaymentScreen = ({route,navigation}) => {
    const [profileName, SetprofileName] = useState(null);
console.log(route.params);
    useEffect(() => {
       getCurrentUser();
    },[])
    const {height, width} = useWindowDimensions();

    const getCurrentUser = async () => {
        const currentUser = auth().currentUser;
    
    if (currentUser) {
      // User is signed in
      const { uid, displayName, email, photoURL } = currentUser;
       SetprofileName(currentUser.displayName);
      // Access the user's data
      // console.log('User ID:', uid);
      // console.log('Display Name:', displayName);
      // console.log('Email:', email);
      // console.log('Photo URL:', photoURL);
    } else {
      // No user is signed in
      console.log('No user is signed in.');
    }
      };
    
      // Function to initiate the payment
      const initiatePayment = () => {
        // Construct the UPI payment URL
        const paymentURL = 'upi://pay?pa=shubhamchepe@oksbi&pn=shubham%20chepe&am=45.00&cu=INR&aid=uGICAgMCs0uGsPg';
    
        // Open the UPI payment URL
        Linking.openURL(paymentURL);
      };

  return (
    <LinearGradient colors={['#DF5C5C', '#EE4444', '#FF1F1F']} style={styles.linearGradient}>
    <Text style={{color:'#fff',fontSize:20, fontWeight:'600',marginTop:20}}>
      Kya Bolte {route.params.username.split(' ').slice(-1).join(' ')}!,
    </Text>
    <Text style={{color:'#fff',fontSize:15,lineHeight:25}}>
    Thanks for checking out this amazing ad-free app! The costs involved include a portion for my delightful tea/coffee and the remainder for maintaining the APIs. Unfortunately, I'm unable to offer you the privilege of using the app for a few days without a payment at the moment. But don't worry, if you're feeling extra generous, you can simply make a small payment and unlock all the wonderful features of the app! Trust me, it's totally worth it, and the price is incredibly affordable, at just 45 rupees per month. So go ahead, treat yourself and enjoy the fantastic experience this app has to offer!
    </Text>
    <View>
    <Text style={{color:'#fff',fontSize:20,marginTop:20}}>
      What do you get in this app?
    </Text>
    <View>
        <Text style={{color:'#fff',fontSize:15,lineHeight:27,fontWeight:'600'}}>
            No-ads
        </Text>
        <Text style={{color:'#fff',fontSize:15,lineHeight:27,fontWeight:'600'}}>
            No-distraction
        </Text>
        <Text style={{color:'#fff',fontSize:15,lineHeight:27,fontWeight:'600'}}>
            Set video reminders for continuous notifications until you finish watching them.
        </Text>
        <Text style={{color:'#fff',fontSize:15,lineHeight:27,fontWeight:'600'}}>
            Videos only from your subscription
        </Text>
        <Text style={{color:'#fff',fontSize:15,lineHeight:27,fontWeight:'600'}}>
            Study music for focused study session
        </Text>
        <Text style={{color:'#fff',fontSize:15,lineHeight:27,fontWeight:'600'}}>
            More to come...
        </Text>
    </View>
    <View style={{marginTop:20}}>
    <TouchableOpacity
          onPress={() => {
            navigation.navigate('ParentScreen',{access:route.params.access})
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
          <Text style={{color:'#5B5B5B',fontWeight:'600'}}>Just ₹1/Day,no monthly auto-debit</Text>
        </TouchableOpacity>
        <Text style={{color:'#fff',textAlign:'center',marginTop:5}}>Make sure to mention your email from which you Signin</Text>
    </View>
    </View>
  </LinearGradient>
  )
}

// Later on in your styles..
var styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 15,
      borderRadius: 5
    }
  });

export default PaymentScreen