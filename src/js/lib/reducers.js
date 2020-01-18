import { 
  actionAudioEnabled, actionStartCall, actionWsConnected, actionWsFailed
} from "./action-names"

import {
  mediaAcquiredState, wsCreatedState, wsConnectedState
} from "./state-names"

import { call } from "./webrtc-manager"
import { connectToWebsocket } from "./websocket"
const wsUrl = "ws://localhost:7766"

function applyStartCall(state, action) {
  // Connect to signaling server over websocket 
  connectToWebsocket(wsUrl)
  const newState = Object.assign({}, state, {state: wsCreatedState})
  return newState
}

function applyAudioEnabled(state, action) {
  const newState = Object.assign({}, state, {state: mediaAcquiredState, isAudioAvail: true})
  return newState
}

function applyWsConnected(state, action) {
  const newState = Object.assign({}, state, {state: wsConnectedState})
  return newState
}

function applyWsFailed(state, action) {
  const newState = Object.assign({}, state, {state: mediaAcquiredState})
  return newState
}

const rootReducer = (state, action) => {
  console.log("Processing action: " + JSON.stringify(action))

  switch(action.type) {
    case actionStartCall: {
      return applyStartCall(state, action)
    } case actionAudioEnabled: {
      return applyAudioEnabled(state, action)
    } case actionWsConnected: {
      return applyWsConnected(state, action)
    } case actionWsFailed: {
      return applyWsFailed(state, action)
    }
    default : return state;
   }
}

export { rootReducer }