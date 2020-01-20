import store from "./store"
import { actionAudioEnabled, actionAudioVideoEnabled, actionConnectedToPeers } from "./action-names"
import { sendMsg } from "./websocket"

const config = { sdpSemantics: "unified-plan" } // alternatively, plan-b

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

// Helpful for testing on computer without webcam
const loadAudioStream = async () => {
    try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    console.log('Received local audio stream');
    localStream = stream;
    store.dispatch({type: actionAudioEnabled})
  } catch (e) {
    alert("Unable to access microphone. Check the connection and reload the page.");
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
  console.log('Starting call');

  startTime = window.performance.now();
  const audioTracks = localStream.getAudioTracks();

  if (audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }

  console.log('RTCPeerConnection configuration:', config);
  localConnection = new RTCPeerConnection(config);
  // makeDataChannel()
  console.log(localConnection.connectionState)
  localConnection.onicecandidate = onIceCandidate

  console.log('Adding audio and video streams to the RTCPeerConnection');
  localStream.getTracks().forEach(track => localConnection.addTrack(track, localStream));

  localConnection.ontrack = gotRemoteStream

  try {
    console.log('creating offer');
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

  const audioTracks = localStream.getAudioTracks();

  if (audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }

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
  // console.log(desc.sdp);

  console.log('localConnection setLocalDescription start');
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
  store.dispatch({type: actionConnectedToPeers})
  // if (remoteVideo.srcObject !== e.streams[0]) {
  //   remoteVideo.srcObject = e.streams[0];
  //   console.log('pc2 received remote stream');
  // }
}

// add a RTCIceCandidate with addIceCandidate()
// const candidateInit = "candidate:4234997325 1 udp 2043278322 192.168.0.56 44323 typ host"
// let iceCandidate = new RTCIceCandidate({candidate: candidateInit})

// get audio and video streams
// create offer

export { loadAudioStream, loadAudioAndVideoStream, call, acceptOffer, acceptAnswer }