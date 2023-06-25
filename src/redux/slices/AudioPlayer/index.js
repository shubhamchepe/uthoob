import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: state => !state,
  },
});


export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;