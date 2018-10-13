import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component {
  constructor(props){
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    });
  }

  handleSignIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut(){
    this.props.firebase.auth().signOut();
  }

  render(){
    return(
      <div>
        <button onClick={ this.handleSignIn }>Sign In</button>
        <button onClick={ this.handleSignOut }>Sign Out</button>
        <p>User: { this.props.user === null ? "Guest" : this.props.user.displayName } </p>
      </div>
    )
  }
}

export default User;
