import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.state = { rooms: [] };
  }

  componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

  render(){
    return(
      <div>
        <h1>Bloc Chat</h1>
        {this.state.rooms.map((room, index) =>
          <li key={room.key}>
            {room.name}
          </li>)}
      </div>
    )
  }
}

export default RoomList;
