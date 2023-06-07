import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  initialState: {
    value: 0,
  },
  name: 'counter',
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const {increment, decrement} = counterSlice.actions;
// export const selectCount = (state) => state.counter.value;
export default counterSlice.reducer;
