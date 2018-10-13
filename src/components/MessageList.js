import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.state = { messages: [],
                   newMessage: ''
                 };
  }

  componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });
}

  render(){
    return(
      <div>
        <h2> { this.props.activeRoom } </h2>
        {this.state.messages.filter(message =>
          message.roomId === this.props.activeRoom).map((message) =>
          <div>
           <tr>User: { message.username}</tr>
           <tr>Message: { message.content }</tr>
           <tr>Sent: { message.sentAt } </tr>
          </div>
        )}
      </div>
    )
  }
}

export default MessageList;
