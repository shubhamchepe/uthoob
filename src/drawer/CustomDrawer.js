import { View, Text,Image,TouchableOpacity,useColorScheme } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const CustomDrawer = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{flex:1,backgroundColor:'#1f1f1f',flexDirection:'column',justifyContent:'space-between'}}>
      <LinearGradient colors={['#DF5C5C', '#EE4444', '#FF1F1F']} style={{height:"20%",backgroundColor:'green',justifyContent:'flex-start'}}>
        <View style={{alignItems:'center',marginTop:20}}>
        <Image source={require('../../assets/avatar.png')} style={{width:50,height:50}} />
      <Text style={{color:'#000'}}>CustomDrawer</Text>
        </View>
      </LinearGradient>
      <View>

      </View>
      <View style={{height:"6.8%",backgroundColor:isDarkMode,justifyContent:'flex-end'}}>
      <TouchableOpacity>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          
          <Image source={require('../../assets/dark.png')} style={{width:25,height:25}} />
          <Text style={{color:'#000',fontWeight:'600',fontSize:10,marginTop:5}}>Light/Dark Mode</Text>
          
        
        </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer