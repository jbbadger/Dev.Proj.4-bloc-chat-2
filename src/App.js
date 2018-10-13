import React, { Component } from 'react';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
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
    this.state = { activeRoom: '',
                   user: null};
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room){
    this.setState({ activeRoom: room.key });
    console.log( "room activated" );
  }

  setUser(user){
    this.setState({ user: user });
    console.log( user )
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
          activeRoom={ this.state.activeRoom }
          user={ this.state.user } />
        <User
          firebase={firebase}
          setUser={this.setUser}
          user={this.state.user}
           />
      </div>
    );
  }
}

export default App;
