import { 
  actionAudioEnabled, actionStartCall, actionWsConnected, actionWsFailed, actionLearnNumPeers, actionConnectedToPeers, actionAudioVideoEnabled, actionMediaUnavailable
} from "./action-names"

import {
  mediaAcquiredState, wsCreatedState, wsConnectedState, knowsPeersState, connectedToPeersState, mediaUnavailableState
} from "./state-names"

import { connectToWebsocket } from "./websocket"

function applyStartCall(state, action) {
  const callButton = document.getElementById('callButton');
  callButton.disabled = true;

  const wsUri = document.getElementById('wsAddress').value
  console.log(wsUri)

  // Connect to signaling server over websocket 
  connectToWebsocket(wsUri) // TODO ensure this is not blocking
  const newState = Object.assign({}, state, {state: wsCreatedState})
  return newState
}

function applyAudioEnabled(state, action) {
  const newState = Object.assign({}, state, {state: mediaAcquiredState, isAudioAvail: true})
  return newState
}

function applyAudioVideoEnabled(state, action) {
  const newState = Object.assign({}, state, {state: mediaAcquiredState, isAudioAvail: true, isVideoAvail: true})
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

function applyMediaUnavailable(state, action) {
  const newState = Object.assign({}, state, {state: mediaUnavailableState})
  return newState
}

const rootReducer = (state, action) => {
  console.log("Processing action: " + JSON.stringify(action))

  switch(action.type) {
    case actionMediaUnavailable: {
      return applyMediaUnavailable(state, action)

    } case actionStartCall: {
      return applyStartCall(state, action)

    } case actionAudioEnabled: {
      return applyAudioEnabled(state, action)
    } case actionAudioVideoEnabled: {
      return applyAudioVideoEnabled(state, action)

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