import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter/index'
import VideoParam from './slices/VideoParams'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    VideoParams: VideoParam
  },
})