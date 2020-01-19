import { 
  actionAudioEnabled, actionStartCall, actionWsConnected, actionWsFailed, actionLearnNumPeers, actionConnectedToPeers
} from "./action-names"

import {
  mediaAcquiredState, wsCreatedState, wsConnectedState, knowsPeersState, connectedToPeersState
} from "./state-names"

import { connectToWebsocket } from "./websocket"

const wsUrl = "ws://10.20.20.4:7766"
const wsUrl = "ws://localhost:7766"
// const wsUrl = "ws://37.218.241.36:7766"

function applyStartCall(state, action) {
  const callButton = document.getElementById('callButton');
  callButton.disabled = true;

  // Connect to signaling server over websocket 
  connectToWebsocket(wsUrl) // TODO ensure this is not blocking
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
  const callButton = document.getElementById('callButton');
  callButton.disabled = false;
  const newState = Object.assign({}, state, {state: mediaAcquiredState, knownPeers: -1})
  return newState
}

function applyLearnNumPeers(state, action) {
  const newState = Object.assign({}, state, {state: knowsPeersState, knownPeers: action.numPeers})
  return newState
}

function applyConnectedToPeers(state, action) {
  const newState = Object.assign({}, state, {state: connectedToPeersState})
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

    } case actionLearnNumPeers: {
      return applyLearnNumPeers(state, action)

    } case actionConnectedToPeers: {
      return applyConnectedToPeers(state, action)
    }

    default : return state;
   }
}

export { rootReducer }