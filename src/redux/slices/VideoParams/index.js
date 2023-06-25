import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchVideos = createAsyncThunk('fetchVideos', async (Obj) => {
     console.log('Token',Obj.B);
    const headers = { 'Authorization': `Bearer ${Obj.B}` }; // auth header with bearer token
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${Obj.A}&maxResults=50&order=date&type=video&key=${API_KEY}`, { headers })
    const result = await response.json();
    await storeSearchResults(Obj.A, result.items);
    return result.items;
    //console.log(result)

});

const storeSearchResults = async (subscriptionId, results) => {
  try {
    // Generate a unique key for each subscription using the subscriptionId
    const key = `searchResults_${subscriptionId}`;

    // Convert the results to JSON before storing
    const resultsJSON = JSON.stringify(results);

    // Store the results in AsyncStorage using the generated key
    await AsyncStorage.setItem(key, resultsJSON);
    console.log('Search results stored successfully.');
  } catch (error) {
    console.log('Error storing search results:', error);
  }
};


export const VideoParam = createSlice({
  name: 'videoparam',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchVideos.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = action.payload;
    });
  },
});

export default VideoParam.reducer;
