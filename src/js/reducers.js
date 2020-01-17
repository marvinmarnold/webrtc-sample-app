import { actionConnectionToggle, actionConnectionInit } from "./vars"

function applyToggleConnection(state, action) {
  const newState = Object.assign({}, state, {isConnected: !state.isConnected})
  return newState
}

function applyConnectionInit(state, action) {
  const newState = Object.assign({}, state, {isConnected: false})
  return newState
}

const rootReducer = (state, action) => {
  switch(action.type) {
      case actionConnectionToggle: {
        return applyToggleConnection(state, action)
      } case actionConnectionInit: {
        return applyConnectionInit(state, action)
      }
      default : return state;
   }
}

export { rootReducer }