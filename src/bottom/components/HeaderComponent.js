import { View, Text, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'


const HeaderComponent = () => {
    const {height, width} = useWindowDimensions();
  return (
    <View style={{height: height/15, backgroundColor:'#cacaca',flexDirection:'row',elevation:6}}>
      <View style={{flex:1,flexDirection:'row',alignItems:"center",paddingLeft:10}}>
        <Image source={require('../../../assets/play-button.png')} style={{width:20, height:20}}/>
        <Text style={{marginLeft:10,fontWeight:'900',fontSize:20,color:'#fff'}}>UTHOOB</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity>
      <Image source={require('../../../assets/avatar.jpg')} style={{width:30, height:30,borderRadius:20,marginRight:10}}/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default HeaderComponent