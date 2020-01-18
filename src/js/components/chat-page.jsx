import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { actionConnectionToggle } from "../lib/vars"

const videoAreaStyle = {
  backgroundColor: 'blue',
  width: '300px',
  height: '300px'
}

class ChatPage extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    feather.replace()
  }

  renderChat() {
    // const status = this.props.isConnected ? "Connected" : "Disconnected"
    // return <Button onClick={this.props.toggle}>Status: {status}</Button>

    return (
        <div className="row">
          <div className="col">
            <h2>Them</h2>
            <div style={videoAreaStyle}>

            </div>
          </div>
          <div className="col">
            <h2>You</h2>
            <div style={videoAreaStyle}>

            </div>
          </div>
        </div>
      )
  }

  renderConnectionControls() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="wsAddress" className="mr-sm-2">WS address</Label>
          <Input type="text" name="wsAddress" id="wsAddress" placeholder="ws://ADDRESS_HERE" />
        </FormGroup>
        <Button>Call</Button>
      </Form>
    )
  }

  renderControls() {
    return (
      <div className="row">
        <div className="col">
          {this.renderConnectionControls()}
        </div>
        <div className="col">
          <button class="btn"><i data-feather="volume-x"></i></button>
          <button class="btn"><i data-feather="video-off"></i></button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid">
          {this.renderChat()}
          {this.renderControls()}
      </div>
    )
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
