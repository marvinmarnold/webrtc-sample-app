import store from "../store"
import { actionAudioEnabled, actionAudioVideoEnabled, actionConnectedToPeers, actionMediaUnavailable } from "../action-names"
import { sendMsg } from "../websocket"

const config = { 
  sdpSemantics: "unified-plan",  // alternatively, plan-b
  iceServers: [ 
      {
        urls: [
          "stun:stun.l.google.com:19302",
        ]
      },
      {
        urls: [
          "stun:stun.stunprotocol.org:3478"
        ]
      }
    ] 
  } 


let localStream

const loadAudioAndVideoStream = async () => {
    try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    console.log('Received local audio and video streams');
    const youVid = document.getElementById("youvid");
    youVid.srcObject = stream;
    localStream = stream;
    store.dispatch({type: actionAudioVideoEnabled})
  } catch (e) {
    store.dispatch({type: actionMediaUnavailable})
    console.error(e)
    alert("Unable to access video. Check the connection and reload the page.");

  }
}

const logLocalStreamInfo = () => {
  const audioTracks = localStream.getAudioTracks();
  if (audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }

  const videoTracks = localStream.getVideoTracks();
  if (videoTracks.length > 0) {
    console.log(`Using video device: ${videoTracks[0].label}`);
  }
}

function handleRemoteStream(e) {
  const themVid = document.getElementById("themvid");

  if (themVid.srcObject !== e.streams[0]) {
    store.dispatch({type: actionConnectedToPeers})
    themVid.srcObject = e.streams[0];
    console.log('[x/x] Received remote stream. Video and audio should appear shortly.');
  }
}


export { loadAudioAndVideoStream, logLocalStreamInfo, handleRemoteStream, localStream, config }