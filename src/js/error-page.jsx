import React, { Component } from "react";
import { Button } from 'reactstrap';
import { connect } from "react-redux";

class ErrorPage extends Component {
  constructor() {
    super();

  }

  render() {
    return <h1>fail</h1>
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ErrorPage)
