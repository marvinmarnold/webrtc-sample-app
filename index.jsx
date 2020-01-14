
const e = React.createElement;

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  renderChat() {

    // return e(
    //   'button',
    //   { onClick: () => this.setState({ liked: true }) },
    //   'Like'
    // );

    // return e(ReactRedux.Provider, store, 'TEST')
    return e('h1', null, 'TEST')
    // return <h1>yo</h1>

  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    return this.renderChat();
  }
}

function connectionReducer(state, action) {
 switch(action.type) {
     default : return state;
   }
}


 const store = Redux.createStore(connectionReducer);

const domContainer = document.querySelector('#chat_window_container');
ReactDOM.render(<ReactRedux.Provider store={store}><ChatWindow /></ReactRedux.Provider>, domContainer);

