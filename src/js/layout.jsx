import React, { Component } from "react";
import ReactDOM from "react-dom";

class Layout extends Component {
  constructor() {
    super();
  }
  handleChange(event) {
  }
  render() {
    return (
      <h1>Hello world</h1>
    );
  }
}
export default Layout;

const wrapper = document.getElementById("chat_window_container");
wrapper ? ReactDOM.render(<Layout />, wrapper) : false;