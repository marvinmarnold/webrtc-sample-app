// // WebRTC
// const config = {sdpSemantics: "unified-plan"} // alternatively, plan-b
// const offerOptions = {
//   offerToReceiveAudio: 1,
//   offerToReceiveVideo: 1
// };


// let localConnection = new RTCPeerConnection(config);
// console.log(localConnection.connectionState)

// // add a RTCIceCandidate with addIceCandidate()
// // const candidateInit = "candidate:4234997325 1 udp 2043278322 192.168.0.56 44323 typ host"
// // let iceCandidate = new RTCIceCandidate()
// // get audio and video streams
// // create offer