import { 
  actionAudioEnabled, actionStartCall 
} from "./vars"

import { call } from "./webrtc-manager"
import { connectToWebsocket } from "./websocket"

function applyStartCall(state, action) {
  connectToWebsocket()
  call()
  const newState = Object.assign({}, state, {isAudioOn: true})
  return newState
}

function applyAudioEnabled(state, action) {
  const newState = Object.assign({}, state, {isAudioAvail: true})
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