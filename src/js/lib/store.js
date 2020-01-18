import { createStore } from 'redux'

import { rootReducer } from "./reducers"

const initialState = {isConnected: false, isVideoOn: true, isAudioOn: false, isVideoAvail: false, isAudioAvail: false}

const store = createStore(rootReducer, initialState)

export default store