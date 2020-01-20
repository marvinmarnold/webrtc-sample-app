import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { actionStartCall } from "../lib/action-names"
import { loadAudioAndVideoStream } from "../lib/webrtc/webrtc-shared"

class ChatPage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    feather.replace()
    loadAudioAndVideoStream()
  }

  renderChat() {
    return (
        <div className="row">
          <div className="col">
            <h2>Them</h2>
            <video id="themvid" playsInline autoPlay muted></video>
          </div>
          <div className="col">
            <h2>You</h2>
            <video id="youvid" playsInline autoPlay></video>
          </div>
        </div>
      )
  }

  renderConnectionControls() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="wsAddress" className="mr-sm-2">WS address</Label>
          <Input type="text" name="wsAddress" id="wsAddress" placeholder="ws://37.218.241.36:7766" defaultValue="ws://37.218.241.36:7766" />
        </FormGroup>
        <Button onClick={this.props.call} id="callButton">Call</Button>
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
          <button className="btn"><i data-feather="volume-x"></i></button>
          <button className="btn"><i data-feather="video-off"></i></button>
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
    call: () => dispatch({ type: actionStartCall}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
