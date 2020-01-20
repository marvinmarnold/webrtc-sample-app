# WebRTC demo

A Redux-React based demo of [WebRTC](https://webrtc.org), using [AdapterJS](https://github.com/webrtcHacks/adapter). This is a simple video conferencing app with WebRTC that has clean management of connection state and an easy UX to video chat with other people by sharing a websocket link.

Live page [here](https://marvinmarnold.github.io/webrtc-sample-app/). 
It won't actually be able to establish a connection to the websocket because HTTPS is being enforced and the websocket does not yet support SSL.

Depends on a websocket based [signaling server](https://github.com/marvinmarnold/webrtc-signaling-server). 
This is currently deployed to ws://37.218.241.36:7766 so no need to deploy your own.

**Note:** Currently does not have valid TUN server configured. Will only reliably work if both clients on same network

## Usage
Open `dist/index.html` with Firefox or Chrome. Or view locally.

```
npm install
npm start
```

## Building

```
npm install --save-dev webpack
npx webpack --mode production
cp dist/index.html .
cp dist/main.js .
```

## Preparation
- Prepare: Review [Jitsi code](https://github.com/jitsi/jitsi-meet/tree/master/react)
- Wireframes & state machine: [here](https://docs.geeky.rocks/shared/X1witnE9_cfgg-3uia9VVm0D1_lwjvGmdpT62SPpDSE)
- State definition: {isConnected, controls: {isVideoOn, isAudioOn}}

## Plan
- [x] Create empty Gatsby project 
- [x] Install [react-redux](https://react-redux.js.org/introduction/quick-start)
- [x] Add a con/disconnect button that toggles and updates redux state
- [x] Install [AdapterJS](https://github.com/webrtcHacks/adapter)
- [x] Enable Github pages
- [x] Access [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) state and display on screen
- [x] Migrate to webpack
- [x] Create a websocket signaling server locally
- [x] Create an offer and send over hardcoded websocket to establish p2p connection
- [x] Deploy signaling server somewhere
- [x] Add a MediaStream with a [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) for video  
- [x] Allow user to input connection details

## Wishlist
- Mute/toggle video support
- Support multiple peer connections
- Add a discovery method that allows site to be serverless (write to a public blockchain)?
- Chatrooms
- Add a [RTCDataChannel](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel) for metadata 

## Resources

- https://www.robinwieruch.de/react-redux-tutorial
- https://webrtc.org/start/
- https://webrtc.github.io/samples/
- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
- https://github.com/cjb/serverless-webrtc/
- https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/