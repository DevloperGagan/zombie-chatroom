import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import './ChatRoom.css'; // Import CSS file for styling

const HauntedQuotes = [
  "Beware, for the spirits lurk in the shadows...",
  "In the realm of the undead, whispers echo louder than screams...",
  "The dead do not rest in peace; they roam the night seeking vengeance...",
  "Here, the boundary between the living and the dead is thin...",
  "Do not be deceived by the silence; the spirits are listening...",
];

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * HauntedQuotes.length);
  return HauntedQuotes[randomIndex];
};

const ChatRoom = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      const messagesArray = [];
      for (let key in messagesData) {
        messagesArray.push(messagesData[key]);
      }
      
      scrollToBottom();
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      firebase.database().ref('messages').push({
        username: username,
        message: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-room">
      <div className="graveyard-names">
        <h1>ZOMBIE SERVER</h1>
        
      </div>
      <div className="haunted-quotes">
        <p>{getRandomQuote()}</p>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="username">{message.username}: </span>
            <span className="text">{message.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Summon</button>
      </div>
      <div className="developer-contact glowing">
        <p>Made with ❤ <a href="http://www.instagram.com/thatlastsurvivor/">thatlastsurvivor</a> For assistance, contact the developer <a href="mailto:himanshupradhhan@hotmail.com">here</a> DM for source 
          code.</p>
      </div>
    </div>
  );
};

export default ChatRoom;
