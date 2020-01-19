import { 
  actionAudioEnabled, actionStartCall, actionWsConnected, actionWsFailed, actionLearnNumPeers
} from "./action-names"

import {
  mediaAcquiredState, wsCreatedState, wsConnectedState, knowsPeersState
} from "./state-names"

import { connectToWebsocket } from "./websocket"

const wsUrl = "ws://localhost:7766"


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
  const newState = Object.assign({}, state, {state: mediaAcquiredState, knownPeers: -1, syncedPeers: -1})
  return newState
}

function applyLearnNumPeers(state, action) {
  const newState = Object.assign({}, state, {state: knowsPeersState, knownPeers: action.numPeers, syncedPeers: -1})
  console.log(newState)
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
    }
    default : return state;
   }
}

export { rootReducer }