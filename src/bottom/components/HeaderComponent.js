import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {toggle} from '../redux/slices/AudioPlayer';

const HeaderComponent = ({profilepic}) => {
  //console.log(profilepic.photoURL)
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const toggleState = useSelector(state => state.toggle);
  
  return (
    <LinearGradient
    colors={['#B50000', '#FF1B1B', '#FF0000']}
      style={{
        height: '8%',
        backgroundColor: '#cacaca',
        flexDirection: 'row',
        elevation: 6,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <Image
          source={require('../../../assets/play.png')}
          style={{width: 20, height: 20}}
        />
        <Text
          style={{
            marginLeft: 10,
            fontWeight: '900',
            fontSize: 20,
            color: '#fff',
          }}>
          {toggleState.toString()}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/play.png')}
            style={{width: 30, height: 30, borderRadius: 20, marginRight: 10}}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HeaderComponent;
