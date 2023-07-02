import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchList: [],
};

const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    setWatchlist(state, action) {
      state.watchList = state.watchList.concat(action.payload);
    },
    removeWatchlist(state, action) {
      const index = state.watchList.findIndex(item => item.id.videoId === action.payload.id);
      if (index !== -1) {
        state.watchList.splice(index, 1);
      }
    },
  }
});

export const { setWatchlist, removeWatchlist } = watchListSlice.actions;

export default watchListSlice.reducer;