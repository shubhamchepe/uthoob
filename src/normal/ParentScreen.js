import { View, Text } from 'react-native'
import React from 'react'
import DrawerNavigator from '../drawer/DrawerNavigator'

const ParentScreen = ({route,navigation}) => {
  //console.log('from Parent Screen',route.params.access)
  //console.log(navigation)
  return (
      <DrawerNavigator navprops={navigation} access={route.params.access} Route={route}/>
  )
}

export default ParentScreen