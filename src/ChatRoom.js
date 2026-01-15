import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import './ChatRoom.css';

const HauntedQuotes = [
  "Beware, for the spirits lurk in the shadows...",
  "In the realm of the undead, whispers echo louder than screams...",
  "The dead do not rest in peace; they roam the night seeking vengeance...",
  "Here, the boundary between the living and the dead is thin...",
  "Do not be deceived by the silence; the spirits are listening...",
];

const getRandomQuote = () =>
  HauntedQuotes[Math.floor(Math.random() * HauntedQuotes.length)];

const ChatRoom = ({ username }) => {
  if (!username) return null;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = firebase
      .database()
      .ref('messages')
      .orderByChild('timestamp');

    const handleData = (snapshot) => {
      const data = snapshot.val();
      setMessages(data ? Object.values(data) : []);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    messagesRef.on('value', handleData);
    return () => messagesRef.off('value', handleData);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    firebase.database().ref('messages').push({
      username,
      message: newMessage,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });

    setNewMessage('');
  };

  return (
    <div className="chat-room">
      <h1>ZOMBIE SERVER</h1>

      <div className="haunted-quotes">
        <p>{getRandomQuote()}</p>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className="message">
            <span className="username">{m.username}: </span>
            <span className="text">{m.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Summon</button>
      </div>
    </div>
  );
};

export default ChatRoom;
