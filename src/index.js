import Layout from "./js/layout.jsx";

// import 'bootstrap/dist/css/bootstrap.min.css';


      // const e = React.createElement;

      // // Redux state management
      // const actionConnectionToggle = 'CONNECTION_TOGGLE'
      // const actionConnectionInit = 'CONNECTION_INITIALIZED'

      // function applyToggleConnection(state, action) {
      //   const newState = Object.assign({}, state, {isConnected: !state.isConnected})
      //   return newState
      // }

      // function applyConnectionInit(state, action) {
      //   const newState = Object.assign({}, state, {isConnected: false})
      //   return newState
      // }

      // function connectionReducer(state, action) {
      //   switch(action.type) {
      //       case actionConnectionToggle: {
      //         return applyToggleConnection(state, action)
      //       } case actionConnectionInit: {
      //         return applyConnectionInit(state, action)
      //       }
      //       default : return state;
      //    }
      // }

      // const initialState = {isConnected: false, controls: {isVideoOn: false, isAudioOn: false}}

      // const store = Redux.createStore(connectionReducer, initialState);

      // // WebRTC
      // const config = {sdpSemantics: "unified-plan"} // alternatively, plan-b
      // const offerOptions = {
      //   offerToReceiveAudio: 1,
      //   offerToReceiveVideo: 1
      // };


      // let localConnection = new RTCPeerConnection(config);
      // console.log(localConnection.connectionState)

      // // add a RTCIceCandidate with addIceCandidate()
      // // const candidateInit = "candidate:4234997325 1 udp 2043278322 192.168.0.56 44323 typ host"
      // // let iceCandidate = new RTCIceCandidate()
      // // get audio and video streams
      // // create offer

      // // UI
      // class ChatWindow extends React.Component {
      //   constructor(props) {
      //     super(props);

      //   }

      //   renderChat() {
      //     const status = store.getState().isConnected ? "Connected" : "Disconnected"
      //     return <Reactstrap.Button onClick={() => store.dispatch({type: 'CONNECTION_TOGGLE'})}>Status: {status}</Reactstrap.Button>
      //   }

      //   render() {
      //     return this.renderChat();
      //   }
      // }

      // // Basic rendering
      // const domContainer = document.querySelector('#chat_window_container');

      // function render() {
      //   ReactDOM.render(<ReactRedux.Provider store={store}><ChatWindow /></ReactRedux.Provider>, domContainer);  
      // }

      // store.subscribe(render)
      // render()