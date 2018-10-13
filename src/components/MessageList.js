import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.state = { messages: [],
                   newMessage: ''
                 };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });
}

  handleMessageChange(input) {
    this.setState({ newMessage: input })
  }

  handleMessageSubmit(e, newMessage) {
    e.preventDefault();
    if (!this.props.activeRoom || !newMessage) {return};
    this.messagesRef.push({
      content: newMessage,
      username: this.props.user ? this.props.user.displayName : "Guest",
      roomId: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({ newMessage: "" });
  }

  logUsername(user, message) {
    if( message.roomId === this.props.activeRoom && this.props.user) {
      return this.props.user.displayName;
    } else if ( message.roomId == this.props.activeRoom && !this.props.user ){
      return "Guest";
    }
  }
  render(){
    return(
      <div>
        <h2> { this.props.activeRoom ? this.props.activeRoom : " " } </h2>
        {this.state.messages.filter(message =>
          message.roomId === this.props.activeRoom).map((message, index) =>
          <li key={index}>
           <span> User: { this.logUsername(this.props.user, message) } </span>
           <p>Message: { message.roomId === this.props.activeRoom ? message.content : " " }</p>
           <p>Sent: { message.roomId === this.props.activeRoom ? message.sentAt : " " } </p>
          </li>
        )}
        <h4>Create Message</h4>
        <section className="new-message-form">
          <input type="text"
            value={ this.state.newMessage }
            onChange={ (e) => this.handleMessageChange(e.target.value) } />
          <input
            type="button"
            value="Send"
            onClick={ (e) => this.handleMessageSubmit(e, this.state.newMessage) }/>
        </section>
      </div>
    )
  }
}

export default MessageList;
