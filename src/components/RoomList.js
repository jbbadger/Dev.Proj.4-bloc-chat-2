import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.state = { rooms: [],
                   newRoom: ''
                 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

  handleChange(e) {
    this.setState({ newRoom: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoom) {return};
    this.setState({ rooms: [...this.state.rooms, this.state.newRoom],
                    newRoom: ''});
    this.roomsRef.push({ name: this.state.newRoom});
}

  handleDelete(roomKey) {
    const room = this.props.firebase.database().ref("rooms/" + roomKey);
    const messages = this.props.firebase.database().ref("messages/" + roomKey);
    room.remove();
    messages.remove();
    window.location.reload(true);
  }

  render(){
    return(
      <div>
      <div>
        <h1>Bloc Chat</h1>
        {this.state.rooms.map((room, index) =>
          <li key={room.key} onClick={() => this.props.setActiveRoom(room) }>
            {room.name}
          <span>
          <button
            type="button"
            onClick={ () => this.handleDelete(room.key)}> delete </button>
          </span>
          </li>)}
      </div>
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text"
            value={ this.state.newRoom }
            onChange={ this.handleChange } />
          <input type="submit" />
        </form>
      </div>
      </div>

    )
  }
}

export default RoomList;
