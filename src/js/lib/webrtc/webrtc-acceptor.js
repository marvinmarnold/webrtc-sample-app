import store from "../store"
import { actionAudioEnabled, actionAudioVideoEnabled, actionConnectedToPeers } from "../action-names"
import { sendMsg } from "../websocket"
import { logLocalStreamInfo, handleRemoteStream, localStream, config } from './webrtc-shared'

let localConnection, answer

/*
  Accept offer initiated by counter party
*/
const acceptOffer = async offer => {
  console.log("[x/x] Accepting offer. Creating RTCPeerConnection.")
  const data = JSON.parse(offer)
  const desc = new RTCSessionDescription(data)
  localConnection = new RTCPeerConnection(config)

  localConnection.onicecandidate = onIceCandidate

  logLocalStreamInfo()

  console.log('Adding audio and video streams to the RTCPeerConnection');
  localStream.getTracks().forEach(track => localConnection.addTrack(track, localStream));

  localConnection.ontrack = handleRemoteStream

  try {
    console.log("About to set local description")
    await localConnection.setRemoteDescription(desc);
    doCreateAnswer();
  } catch (e) {
    console.error("Something went wrong while trying to set remote description.");
    console.error(e)
  }
}

const onIceCandidate = candidate => {
  // Firing this callback with a null candidate indicates that
  // trickle ICE gathering has finished, and all the candidates
  // are now present in pc.localDescription.  Waiting until now
  // to create the answer saves us from having to send offer +
  // answer + iceCandidates separately.
  if (candidate.candidate == null) {
      console.log("[x/x] Finished creating answer. About to send over websocket.")
      sendMsg("A:" + JSON.stringify(answer))
  }
}

async function doCreateAnswer() {
  try {
    console.log("[x/x] About to create an answer")
    answer = await localConnection.createAnswer();
    await localConnection.setLocalDescription(answer);
  } catch (e) {
    console.error("Something went wrong while trying to create an answer.");
    console.error(e)
  }
}


export { acceptOffer }