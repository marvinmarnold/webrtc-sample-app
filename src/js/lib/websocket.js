let ws

const connectToWebsocket = (wsUri, onSuccess, onError) => {
  ws = new WebSocket(wsUri)


  ws.onconnect = evt => {
    console.log("Successfully connected to the websocket")
    // call()
    // const newState = Object.assign({}, state, {isAudioOn: true})
    // return newState
  }

  ws.onerror = err => {
    console.log(err)
    alert("Unable to connect to signaling server " + wsUrl + " please ensure its up and try reloading the page.")
    // TODO should add an error message to redux state that ultimately gets displayed
  }
}


export { connectToWebsocket }
