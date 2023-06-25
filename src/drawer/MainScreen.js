import { View, Text } from 'react-native'
import React from 'react'
import BottomNavigator from '../bottom/BottomNavigator'

const MainScreen = ({NavProps,Access}) => {
  
  return (
    
      <BottomNavigator NavProps={NavProps} Access={Access}/>
    
  )
}

export default MainScreen