import store from "../store"
import { actionAudioEnabled, actionAudioVideoEnabled, actionConnectedToPeers } from "../action-names"
import { sendMsg } from "../websocket"
import { logLocalStreamInfo, handleRemoteStream, localStream, config } from './webrtc-shared'

let localConnection

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

/*
  Send initial offer
*/
const call = async () => {
  console.log('[x/x] Initiating call. Creating peer connection.');
  logLocalStreamInfo()

  localConnection = new RTCPeerConnection(config);
  localConnection.onicecandidate = onIceCandidate

  console.log('[x/x] Adding audio and video streams to the RTCPeerConnection');
  localStream.getTracks().forEach(track => localConnection.addTrack(track, localStream));

  localConnection.ontrack = handleRemoteStream

  try {
    console.log('[x/x] Creating initial offer');
    const offer = await localConnection.createOffer(offerOptions);
    await onCreateOfferSuccess(offer);
  } catch (error) {
    console.log(`Failed to create session description: ${error.toString()}`);

  }
}

const onIceCandidate = candidate => {
  // Firing this callback with a null candidate indicates that
  // trickle ICE gathering has finished, and all the candidates
  // are now present in pc.localDescription.  Waiting until now
  // to create the answer saves us from having to send offer +
  // answer + iceCandidates separately.
  if (candidate.candidate == null) {
    console.log("[x/x] Finished creating offer. About to send over websocket.")
    sendMsg("O:" + JSON.stringify(localConnection.localDescription))
  }
}

const onCreateOfferSuccess = async (desc) => {
  console.log(`[x/x] Offer successfully created. Setting local description.`);

  try {
    await localConnection.setLocalDescription(desc);
    console.log(`[x/x] Local setLocalDescription complete. Waiting for ICE candidates in order to complete the offer.`);
  } catch (error) {
    console.log(`Failed to set session description: ${error.toString()}`);

  }
}

/*
  Handling answer
*/
const acceptAnswer = ans => {
  console.log("[x/x] Processing answer from acceptor, setting it as a remote description.")
  const data = JSON.parse(ans)
  const desc = new RTCSessionDescription(data)
  localConnection.setRemoteDescription(desc)
}

export { call, acceptAnswer }