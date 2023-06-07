import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const Screen2 = () => {
  return (
    
      <WebView source={{ uri: 'https://accounts.google.com/o/oauth2/v2/auth' }} style={{ flex: 1 }} />
  
  )
}

export default Screen2