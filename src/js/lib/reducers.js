import { 
  actionAudioEnabled, actionStartCall 
} from "./vars"

import {
  mediaAcquiredState, wsCreatedState
} from "./state-names"

import { call } from "./webrtc-manager"
import { connectToWebsocket } from "./websocket"
const wsUrl = "ws://localhost:7766"

/*
  Connect to signaling server over websocket then start the call
*/


function applyStartCall(state, action) {
  connectToWebsocket(wsUrl)
  const newState = Object.assign({}, state, {state: wsCreatedState, isAudioAvail: true})
  return newState
}

function applyAudioEnabled(state, action) {
  const newState = Object.assign({}, state, {state: mediaAcquiredState, isAudioAvail: true})
  return newState
}

const rootReducer = (state, action) => {
  switch(action.type) {
      case actionStartCall: {
        return applyStartCall(state, action)
      } case actionAudioEnabled: {
        return applyAudioEnabled(state, action)
      }
      default : return state;
   }
}

export { rootReducer }