import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_KEY} from '@env';


export const fetchVideos = createAsyncThunk('fetchVideos', async (Obj) => {

  const checkInDb = await fetch(`https://plain-colt-cuff-links.cyclic.app/check-videos-in-db/${Obj.A}`, {   method: 'GET',
headers: {
  'Content-Type': 'application/json',
} })
    const result1 = await checkInDb.json();
    if(result1 === false){
      console.log('Token',Obj.B);
      const headers = { 'Authorization': `Bearer ${Obj.B}` }; // auth header with bearer token
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${Obj.A}&maxResults=50&order=date&type=video&key=${API_KEY}`, { headers })
      const result = await response.json();
      const videoDocuments = result.items.map((video) => ({
        id: video.id.videoId,
        snippet: {
          publishedAt: video.snippet.publishedAt,
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnails: {
            default: {
              url: video.snippet.thumbnails.high.url,
              width: video.snippet.thumbnails.high.width,
              height: video.snippet.thumbnails.high.height,
            },
          },
          channelTitle: video.snippet.channelTitle,
        },
      }));
      
      const requestBody = {
        videos: videoDocuments,
      };
      
      const SaveToDb = await fetch(`https://plain-colt-cuff-links.cyclic.app/videos/${Obj.A}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      const SavedToDb = await SaveToDb.json();
      return SavedToDb.videoDocuments;
    }else{
      const checkInDb = await fetch(`https://plain-colt-cuff-links.cyclic.app/check-videos-in-db/${Obj.A}`, {   method: 'GET',
headers: {
  'Content-Type': 'application/json',
} })
    const result1 = await checkInDb.json();
    return result1.result.videos
    }
    
    //console.log(result.items)
    //Create an array to store the video documents


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
