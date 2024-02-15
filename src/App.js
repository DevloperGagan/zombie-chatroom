import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // import syntax for Firebase
import 'firebase/compat/database'; //import syntax for Firebase Realtime Database
import WelcomePopup from './WelcomePopup';
import ChatRoom from './ChatRoom';
import './App.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW_T12aiRs220zcuRRuXofBXfRoESx_F4",
  authDomain: "zombiechat-73a7b.firebaseapp.com",
  databaseURL: "https://zombiechat-73a7b-default-rtdb.firebaseio.com",
  projectId: "zombiechat-73a7b",
  storageBucket: "zombiechat-73a7b.appspot.com",
  messagingSenderId: "216762681428",
  appId: "1:216762681428:web:4576b4a7ddb9ef33f305c1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
