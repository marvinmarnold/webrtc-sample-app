import { createStore } from 'redux'

import { rootReducer } from "./reducers"

import { initialState as initialStateName } from "./state-names"

const initialState = {state:  initialStateName, isVideoAvail: false, isAudioAvail: false}

const store = createStore(rootReducer, initialState)

export default store