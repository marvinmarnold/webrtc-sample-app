import store from "./store"
import { actionAudioEnabled, actionAudioVideoEnabled, actionConnectedToPeers } from "./action-names"
import { sendMsg } from "./websocket"

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

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

let localStream, startTime, localConnection, answer

const loadAudioAndVideoStream = async () => {
    try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    console.log('Received local audio and video streams');
    const youVid = document.getElementById("youvid");
    youVid.srcObject = stream;
    localStream = stream;
    store.dispatch({type: actionAudioVideoEnabled})
  } catch (e) {
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

const onIceCandidate = candidate => {
  // Firing this callback with a null candidate indicates that
  // trickle ICE gathering has finished, and all the candidates
  // are now present in pc.localDescription.  Waiting until now
  // to create the answer saves us from having to send offer +
  // answer + iceCandidates separately.
  if (candidate.candidate == null) {
    console.log("Finished creating offer")
    sendMsg("O:" + JSON.stringify(localConnection.localDescription))
  }
}

const call = async () => {
  console.log('Initiating  call');

  logLocalStreamInfo()

  // console.log('RTCPeerConnection configuration:', config);
  localConnection = new RTCPeerConnection(config);
  localConnection.onicecandidate = onIceCandidate

  // console.log('Adding audio and video streams to the RTCPeerConnection');
  localStream.getTracks().forEach(track => localConnection.addTrack(track, localStream));

  localConnection.ontrack = gotRemoteStream

  try {
    console.log('[1/7] Creating initial offer');
    const offer = await localConnection.createOffer(offerOptions);
    await onCreateOfferSuccess(offer);
  } catch (e) {
    onCreateSessionDescriptionError(e);
  }
}

function doHandleError(error) {
  throw error;
}

async function doCreateAnswer() {
  try {
    console.log("About to create an answer")
    answer = await localConnection.createAnswer();
    await localConnection.setLocalDescription(answer);
  } catch (e) {
    doHandleError(e);
  }
}

const acceptAnswer = ans => {
  const data = JSON.parse(ans)
  const desc = new RTCSessionDescription(data)
  localConnection.setRemoteDescription(desc)
}

const acceptOffer = async offer => {
  const data = JSON.parse(offer)
  console.log("Accepting offer " + data)
  const desc = new RTCSessionDescription(data)
  localConnection = new RTCPeerConnection(config)

  localConnection.onicecandidate = function(candidate) {
    // Firing this callback with a null candidate indicates that
    // trickle ICE gathering has finished, and all the candidates
    // are now present in pc.localDescription.  Waiting until now
    // to create the answer saves us from having to send offer +
    // answer + iceCandidates separately.
    if (candidate.candidate == null) {
      console.log("Finished creating answer")
      sendMsg("A:" + JSON.stringify(answer))
    }
  }

  logLocalStreamInfo()

  console.log('Adding audio and video streams to the RTCPeerConnection');
  localStream.getTracks().forEach(track => localConnection.addTrack(track, localStream));

  localConnection.ontrack = gotRemoteStream

  try {
    console.log("About to set local description")
    await localConnection.setRemoteDescription(desc);
    doCreateAnswer();
  } catch (e) {
    doHandleError(e);
  }
}

const onCreateOfferSuccess = async (desc) => {
  console.log(`Offer on local machine`);

  try {
    await localConnection.setLocalDescription(desc);
    onSetLocalSuccess();
  } catch (e) {
    onSetSessionDescriptionError();
  }
}

function onCreateSessionDescriptionError(error) {
  console.log(`Failed to create session description: ${error.toString()}`);
}

function onSetSessionDescriptionError(error) {
  console.log(`Failed to set session description: ${error.toString()}`);
}

function onSetLocalSuccess() {
  console.log(`Local setLocalDescription complete`);
}

function gotRemoteStream(e) {
  const themVid = document.getElementById("themvid");

  store.dispatch({type: actionConnectedToPeers})
  if (themVid.srcObject !== e.streams[0]) {
    themVid.srcObject = e.streams[0];
    console.log('received remote stream');
  }
}


export { loadAudioAndVideoStream, call, acceptOffer }