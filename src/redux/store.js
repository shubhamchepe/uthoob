import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter/index'
import VideoParam from './slices/VideoParams'
import toggleReducer  from './slices/AudioPlayer'
import SubsData from './slices/SubsData'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    VideoParams: VideoParam,
    toggle: toggleReducer,
    subsdata: SubsData

  },
})