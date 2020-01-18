import store from "./store"
import { actionWsConnected, actionWsFailed } from "./action-names"

let ws

const connectToWebsocket = (wsUri, onSuccess, onError) => {
  ws = new WebSocket(wsUri)
  console.log("Created websocket connection")

  ws.onopen = evt => {
    console.log("Successfully connected to the websocket")
    store.dispatch({type: actionWsConnected})
    // call()
    // const newState = Object.assign({}, state, {isAudioOn: true})
    // return newState
  }

  ws.onerror = err => {
    console.log(err)
    alert("Unable to connect to signaling server " + wsUri + " please ensure its up and try calling again.")
    store.dispatch({type: actionWsFailed})
    // TODO should add an error message to redux state that ultimately gets displayed
  }
}


export { connectToWebsocket }
