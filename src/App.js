import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import WelcomePopup from './WelcomePopup';
import ChatRoom from './ChatRoom';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyBlsrAEsOts109VisbaD1VQ9FwIu88fjRs",
  authDomain: "zombiechatv2.firebaseapp.com",
  databaseURL: "https://zombiechatv2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zombiechatv2",
  storageBucket: "zombiechatv2.firebasestorage.app",
  messagingSenderId: "544716978541",
  appId: "1:544716978541:web:0e9fd839565db35f654264"
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
