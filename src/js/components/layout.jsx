import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'

import store from '../lib/store'

import PageRouter from "./page-router.jsx"

class Layout extends Component {
  constructor() {
    super();
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

