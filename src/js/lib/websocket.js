import store from "./store"
import { actionWsConnected, actionWsFailed, actionLearnNumPeers } from "./action-names"

import { call, acceptOffer, acceptAnswer } from "./webrtc-manager"

let ws

const handleNumPeers = (dat) => {
  const numPeers = parseInt(dat)
  store.dispatch({type: actionLearnNumPeers, numPeers})

  if (numPeers > 1) {
    console.log("More than one peer is connected. Going to start call.")
    call()
  } else {
    console.log("Only one peer is connected. Cannot start call. Waiting for more peers to connect.")
  }
}

const connectToWebsocket = (wsUri, onSuccess, onError) => {
  ws = new WebSocket(wsUri)
  console.log("Created websocket connection")

  ws.onopen = evt => {
    console.log("Successfully connected to the websocket")
    store.dispatch({type: actionWsConnected})
  }

  ws.onerror = err => {
    console.log(err)
    alert("Unable to connect to signaling server " + wsUri + " please ensure its up and try calling again.")
    store.dispatch({type: actionWsFailed})
    // TODO should add an error message to redux state that ultimately gets displayed
  }

  ws.onmessage = evt => {
    console.log("Got message over websocket")
    // console.log("from server: " + evt.data)
    const msgType = evt.data.charAt(0)
    const msg = evt.data.substring(2)

    if (msgType === 'N') {
      console.log("Got a message about number of peers")
      // num peers msg
      handleNumPeers(msg)
    } else if (msgType === 'O') {
      // offer msg
      console.log("Got an offer message")
      acceptOffer(msg)
    } else if (msgType === 'A') {
      // answer msg
      console.log("Got an answer message")
      acceptAnswer(msg)
    } else {
      console.log("Unknown message type " + msgType)
    }
  }

  ws.onclose = evt => {
    console.log("Websocket disconnected")
    store.dispatch({type: actionWsFailed})
  }
}

const sendMsg = msg => {
  console.log("Sending message to ws server")
  ws.send(msg)
}

export { connectToWebsocket, sendMsg }
