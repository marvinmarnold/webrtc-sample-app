import React, { Component } from "react";
import { connect } from "react-redux";

import ChatPage from "./chat-page.jsx"
import ErrorPage from "./error-page.jsx"

import { 
  initialState, 
  mediaUnavailableState 
} from "../lib/state-names"

class PageRouter extends Component {
  constructor() {
    super();
  }

  renderPage() {
    const displayChatEror = this.props.stateName === mediaUnavailableState

    if (displayChatEror) {
      return <ErrorPage />
    } else {
      return <ChatPage />
    } 
  }

  render() {
    return (
      <div>
        <h6>Current state: {this.props.stateName}</h6>
        {this.renderPage()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { stateName: state.state }
}

export default connect(mapStateToProps)(PageRouter)
