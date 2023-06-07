import { View, Text } from 'react-native'
import React from 'react'
import DrawerNavigator from '../drawer/DrawerNavigator'

const ParentScreen = ({route,navigation}) => {
  console.log(route)
  //console.log(navigation)
  return (
      <DrawerNavigator navprops={navigation}/>
  )
}

export default ParentScreen