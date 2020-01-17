const config = {sdpSemantics: "unified-plan"} // alternatively, plan-b

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

let localStream

const loadStreams = async () => {
    try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    console.log('Received local stream');
    localVideo.srcObject = stream;
    localStream = stream;
  } catch (e) {
    alert(`getUserMedia() error: ${e.name}`);
  }

  let localConnection = new RTCPeerConnection(config);
  console.log(localConnection.connectionState)
}


// add a RTCIceCandidate with addIceCandidate()
// const candidateInit = "candidate:4234997325 1 udp 2043278322 192.168.0.56 44323 typ host"
// let iceCandidate = new RTCIceCandidate({candidate: candidateInit})

// get audio and video streams
// create offer

export { loadStreams }