import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_KEY} from '@env';


export const fetchSubs = createAsyncThunk('fetchSubs', async (token) => {
    
        const headers = { 'Authorization': `Bearer ${token}` }; // auth header with bearer token
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&mine=true&key=${API_KEY}`, { headers })
        const result = await response.json();
        return result.items;
  

});

export const SubsData = createSlice({
  name: 'subsdata',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchSubs.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchSubs.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSubs.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = action.payload;
    });
  },
});

export default SubsData.reducer;
