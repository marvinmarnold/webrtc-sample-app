import React, { Component } from "react";
import { connect } from "react-redux";

import ChatPage from "./chat-page.jsx"
import ErrorPage from "./error-page.jsx"

class PageRouter extends Component {
  constructor() {
    super();
  }

  render() {
    console.log("router")
    console.log(this.props)
    if (this.props.isMediaAvailable) {
      return <ChatPage />
    } else {
      return <ErrorPage />
    }
  }
}

const mapStateToProps = state => {
  return { isMediaAvailable: state.isAudioAvail || state.isVideoAvail }
}

export default connect(mapStateToProps)(PageRouter)
