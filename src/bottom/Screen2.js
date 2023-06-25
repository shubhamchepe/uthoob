import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Image,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {API_KEY} from '@env';



const Screen2 = ({ props, NavigationProps, AccessToken }) => {
  const token = AccessToken;
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchText}&key=${API_KEY}`,
      { headers }
    )
      .then(response => response.json())
      .then(resp => {
        setSearchResults(resp.items);
        console.log(resp.items)
      })
      .catch(err => {setSearchResults(null);});
  };

  const handleInputChange = text => {
    setSearchText(text);
  };

  const handleSearchButtonPress = () => {
    handleSearch();
  };

  const handleCancelButtonPress = () => {
    setSearchText('');
    setIsFocused(false);
    Keyboard.dismiss();
  };


  const animateSearchBar = () => {
    setIsFocused(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animateSearchBar(); // Trigger the animation when the component mounts
  }, []);

  const searchBoxStyle = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [250, 0],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'height' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.header}>
        <Animated.View style={[styles.searchBox, searchBoxStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#27a844"
            value={searchText}
            onChangeText={handleInputChange}
            onFocus={animateSearchBar}
            onSubmitEditing={handleSearchButtonPress}
          />
          <TouchableWithoutFeedback onPress={handleSearchButtonPress}>
            <View style={styles.searchButton}>
              <Image
                source={require('../../assets/search.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </TouchableWithoutFeedback>
          {isFocused && (
            <TouchableWithoutFeedback onPress={handleCancelButtonPress}>
              <View style={styles.cancelButton}>
                <Image
                  source={require('../../assets/cross.png')}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </Animated.View>
      </View>

      <ScrollView
        contentContainerStyle={styles.searchResultsContainer}
        keyboardShouldPersistTaps="handled"
      >
        {searchResults !== undefined ? searchResults.map(item => (
          <TouchableOpacity
            key={item.etag}
            onPress={() => {
              NavigationProps.navigate('WatchVideoScreen', {
                Url: item.id.videoId,
              });
            }}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.snippet.thumbnails.default.url }}
                style={styles.thumbnail}
              />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.snippet.title}</Text>
                <Text style={styles.channel}>{item.snippet.channelTitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )) : <View style={{alignItems:'center',justifyContent:'center',marginTop:150}}>
        <Image source={require('../../assets/shiba.png')} style={{width:100, height:100}}/>
        <Text style={{color:'#000'}}>Issue With YouTube</Text>
       </View>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f7f5f5',
    width: 300,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    color: '#000',
  },
  searchButton: {
    padding: 5,
    marginLeft: 10,
    backgroundColor: '#ccc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    padding: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  searchResultsContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '45%',
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
    marginTop: -12,
  },
  channel: {
    fontSize: 11,
    color: '#555',
    marginBottom: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  views: {
    fontSize: 12,
    color: '#555',
  },
  duration: {
    fontSize: 12,
    color: '#555',
  },
});

export default Screen2;