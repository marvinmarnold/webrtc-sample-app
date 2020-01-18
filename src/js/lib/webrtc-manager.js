import store from "./store"
import { actionAudioEnabled } from "./vars"

const config = {sdpSemantics: "unified-plan"} // alternatively, plan-b

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

let localStream, startTime

const loadAudioAndVideoStream = async () => {
    try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    console.log('Received local audio and video streams');
    localVideo.srcObject = stream;
    localStream = stream;
  } catch (e) {
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

const call = async () => {
  console.log('Starting call');

  startTime = window.performance.now();
  const audioTracks = localStream.getAudioTracks();

  if (audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }

  console.log('RTCPeerConnection configuration:', config);
  let localConnection = new RTCPeerConnection(config);
  console.log(localConnection.connectionState)

  console.log('Adding audio and video streams to the RTCPeerConnection');
  localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));

  try {
    console.log('creating offer');
    const offer = await localConnection.createOffer(offerOptions);
    await onCreateOfferSuccess(offer);
  } catch (e) {
    onCreateSessionDescriptionError(e);
  }
}

const onCreateOfferSuccess = async (desc) => {
  console.log(`Offer from pc1\n${desc.sdp}`);
  console.log('pc1 setLocalDescription start');
  try {
    await pc1.setLocalDescription(desc);
    onSetLocalSuccess(pc1);
  } catch (e) {
    onSetSessionDescriptionError();
  }
}

function onCreateSessionDescriptionError(error) {
  console.log(`Failed to create session description: ${error.toString()}`);
}

function onSetLocalSuccess(pc) {
  console.log(`${getName(pc)} setLocalDescription complete`);
}

// add a RTCIceCandidate with addIceCandidate()
// const candidateInit = "candidate:4234997325 1 udp 2043278322 192.168.0.56 44323 typ host"
// let iceCandidate = new RTCIceCandidate({candidate: candidateInit})

// get audio and video streams
// create offer

export { loadAudioStream, loadAudioAndVideoStream }