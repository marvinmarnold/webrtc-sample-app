import React, { Component } from "react";
import { Button } from 'reactstrap';
import { connect } from "react-redux";

import { actionConnectionToggle } from "./vars"

class ChatPage extends Component {
  constructor() {
    super();

  }

  renderChat() {
    const status = this.props.isConnected ? "Connected" : "Disconnected"
    return <Button onClick={this.props.toggle}>Status: {status}</Button>
  }

  render() {
    return this.renderChat();
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    toggle: () => dispatch({ type: actionConnectionToggle}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
