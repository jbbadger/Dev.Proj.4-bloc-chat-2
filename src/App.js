import React, { Component } from 'react';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import * as firebase from 'firebase';
import './App.css';
var config = {
  apiKey: "AIzaSyApyA9sioUkjCzg69iscJHnq7oGadNdL_8",
  authDomain: "devproj4-bloc-chat-2.firebaseapp.com",
  databaseURL: "https://devproj4-bloc-chat-2.firebaseio.com",
  projectId: "devproj4-bloc-chat-2",
  storageBucket: "devproj4-bloc-chat-2.appspot.com",
  messagingSenderId: "849322716105"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = { activeRoom: '' };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room){
    this.setState({ activeRoom: room.key });
    console.log( "room activated" );
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase={firebase}
          setActiveRoom={ (room) => this.setActiveRoom(room) }
          activeRoom={ this.state.activeRoom } />
        <MessageList
          firebase={firebase}
          activeRoom={ this.state.activeRoom } />
      </div>
    );
  }
}

export default App;
