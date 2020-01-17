import React, { Component } from "react"
import ReactDOM from "react-dom"
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { rootReducer } from "./reducers"
import { loadStreams } from "./webrtc-manager"

import Page from "./page.jsx"

const initialState = {isConnected: false, controls: {isVideoOn: true, isAudioOn: false}, availableMedia: {video: false, audio: false}}
const store = createStore(rootReducer, initialState)

class Layout extends Component {
  constructor() {
    super();
    loadStreams()
  }
  render() {
    return (
      <Provider store={store}>
        <Page />
      </Provider>
    );
  }
}
export default Layout;

const wrapper = document.getElementById("chat_window_container");
wrapper ? ReactDOM.render(<Layout />, wrapper) : false;
