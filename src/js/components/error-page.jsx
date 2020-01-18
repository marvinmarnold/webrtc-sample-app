import React, { Component } from "react";
import { Button } from 'reactstrap';
import { connect } from "react-redux";

class ErrorPage extends Component {
  constructor() {
    super();

  }

  render() {

    return (
      <div className="container">
        <h1 className="mt-3">Unable to access media. Please check connections and reload the page.</h1>
        <h2 className="mt-5">Audio available: {this.props.isAudioAvail ? "True" : "False"}</h2>
        <h2>Video available: {this.props.isVideoAvail ? "True" : "False"}</h2>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {isAudioAvail: state.isAudioAvail, isVideoAvail: state.isVideoAvail}
}

export default connect(mapStateToProps)(ErrorPage)
