# WebRTC demo

A Redux-React based demo of [WebRTC](https://webrtc.org), using [AdapterJS](https://github.com/webrtcHacks/adapter). This is a simple video conferencing app with WebRTC that has clean management of connection state and an easy UX to video chat with other people by sharing a websocket link.

## Preparation
- Prepare: Review [Jitsi code](https://github.com/jitsi/jitsi-meet/tree/master/react)
- Wireframes: [here](https://docs.geeky.rocks/shared/X1witnE9_cfgg-3uia9VVm0D1_lwjvGmdpT62SPpDSE)
- State definition: {isConnected, controls: {isVideoOn, isAudioOn}}

## Plan
- [x] Create empty Gatsby project 
- [x] Install [react-redux](https://react-redux.js.org/introduction/quick-start)
- [x] Add a con/disconnect button that toggles and updates redux state
- [ ] Install [AdapterJS](https://github.com/webrtcHacks/adapter)
- [ ] Access [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) state and display on screen
- [ ] Create a connection using hardcoded details
- [ ] Allow user to input connection details
- [ ] Add a MediaStream with a [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) for video  
- [ ] Add audio

## Wishlist
- Mute/toggle video support
- Support multiple peer connections
- Add a discovery method that allows site to be serverless (write to a public blockchain)?
- Chatrooms
- Add a [RTCDataChannel](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel) for metadata 

## Resources
https://www.robinwieruch.de/react-redux-tutorial
https://webrtc.org/start/