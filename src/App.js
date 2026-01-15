import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import WelcomePopup from './WelcomePopup';
import ChatRoom from './ChatRoom';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCC3ENCbXGHnGGDLkFg3SY5545wobIiz64",
  authDomain: "zombie-64df0.firebaseapp.com",
  databaseURL: "https://zombie-64df0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zombie-64df0",
  storageBucket: "zombie-64df0.appspot.com",
  messagingSenderId: "388952215569",
  appId: "1:388952215569:web:cf8954d1628c3dce2961b0",
  measurementId: "G-MWJFFQ3LZF"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [username, setUsername] = useState('');

  const enterChatRoom = (username) => {
    setUsername(username);
  };

  return (
    <div className="App">
      {username ? (
        <ChatRoom username={username} />
      ) : (
        <WelcomePopup enterChatRoom={enterChatRoom} />
      )}
    </div>
  );
}

export default App;
