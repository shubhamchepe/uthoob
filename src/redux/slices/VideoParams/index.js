import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchVideos = createAsyncThunk('fetchVideos', async (channelid) => {

  const url = `https://youtube-v311.p.rapidapi.com/search/?part=snippet&channelId=${channelid}&maxResults=50&order=date&safeSearch=moderate&type=video%2Cchannel%2Cplaylist`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2b0424bbf6msh9a933d40c813bbbp1b475bjsn2606ff9b0067',
      'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
    }
  };
    const response = await fetch(url, options);
    const result = await response.json();
    return result.items;
    console.log(result)

});

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
