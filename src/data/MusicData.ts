import { Track } from 'react-native-track-player';

export const songs: Track[] = [
    {
        id:1,
        url: 'https://firebasestorage.googleapis.com/v0/b/uthoob-c3950.appspot.com/o/My%20Rose%20%E2%80%A2%20Peaceful%20Piano%2C%20Cello%20%26%20Guitar%20Music%20by%20Soothing%20Relaxation.mp3?alt=media&token=3583c555-0743-4c87-a1e7-f9c05188d773', // Load media from the network
        title: 'First Track',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339
        artwork: 'https://firebasestorage.googleapis.com/v0/b/uthoob-c3950.appspot.com/o/20220202_105709.jpg?alt=media&token=0a32d2a6-e889-457b-bcc0-321f93a2a92a', // Load artwork from the network
        duration: 402 
    },
    {
        id:2,
        url: 'https://firebasestorage.googleapis.com/v0/b/uthoob-c3950.appspot.com/o/1%20HOUR%20LONG%20Music%20for%20Studying%20and%20Work%2C%20Concentration%2C%20and%20Focus%20(Part%202).mp3?alt=media&token=75f165c3-b835-48bf-929d-0e3c0d281612', // Load media from the network
        title: 'Second Track',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339
        artwork: 'https://firebasestorage.googleapis.com/v0/b/uthoob-c3950.appspot.com/o/20220202_105709.jpg?alt=media&token=0a32d2a6-e889-457b-bcc0-321f93a2a92a', // Load artwork from the network
        duration: 402 // Duration in seconds
    },
    {
        id:3,
        url: 'https://firebasestorage.googleapis.com/v0/b/uthoob-c3950.appspot.com/o/X2Download.app%20-%203-Hour%20Study%20with%20Me%20and%20My%20Cat%20_%20Pomodoro%20Timer%2C%20Lofi%20Relaxing%20Music%20_%20Day%2070%20(128%20kbps).mp3?alt=media&token=55871720-0df9-4010-add1-f3c62a67e632', // Load media from the app bundle
        title: 'Third Track',
        artist: 'deadmau5',
        artwork: 'https://firebasestorage.googleapis.com/v0/b/uthoob-c3950.appspot.com/o/20220202_105709.jpg?alt=media&token=0a32d2a6-e889-457b-bcc0-321f93a2a92a', // Load artwork from the app bundle
        duration: 166
    },
    {
        id:4,
        url: 'https://firebasestorage.googleapis.com/v0/b/uthoob-c3950.appspot.com/o/X2Download.app%20-%20Work%20Music%20%E2%80%94%20Superhero%20Mix%20for%20Concentration%20(128%20kbps).mp3?alt=media&token=4cec80e7-4d25-47e7-a15f-28ed76d3c2de', // Load media from the file system
        title: 'Fourth Track',
        artist: 'deadmau5',
         // Load artwork from the file system:
        artwork: 'https://firebasestorage.googleapis.com/v0/b/uthoob-c3950.appspot.com/o/20220202_105709.jpg?alt=media&token=0a32d2a6-e889-457b-bcc0-321f93a2a92a',
        duration: 411
    }
]

    

