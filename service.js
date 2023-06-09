import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";
import { songs } from "./src/data/MusicData";

export async function setupPlayer(){
    let isSetup = false;
    try{
     await TrackPlayer.getActiveTrackIndex()
     isSetup = true
    }catch(error){
      await TrackPlayer.setupPlayer()
      isSetup = true
    }finally{
       return isSetup;
    }
}

export async function addTrack(){
    try{
        await TrackPlayer.add(songs)
    }catch(err){
       console.log(err)
    }
    
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export async function playbackService(){
TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause()
})
TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play()
})
TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext()
})
TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious()
})
}