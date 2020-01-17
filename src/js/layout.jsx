import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'

import { loadAudioStream } from "./webrtc-manager"
import store from './store'

import PageRouter from "./page-router.jsx"

class Layout extends Component {
  constructor() {
    super();
    loadAudioStream()
  }

  render() {
    return (
      <Provider store={store}>
        <PageRouter />
      </Provider>
    );
  }
}

export default Layout

const wrapper = document.getElementById("chat_window_container");
wrapper ? ReactDOM.render(<Layout />, wrapper) : false;

