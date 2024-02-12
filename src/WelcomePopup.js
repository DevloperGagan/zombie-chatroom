// WelcomePopup.js

import React, { useState } from 'react';
import zombieAvatar from './zombie-avatar.png'; // Import the zombie avatar image

const WelcomePopup = ({ enterChatRoom }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      enterChatRoom(username);
    } else {
      alert('Zombie ID');
    }
  };

  return (
    <div className="card-container">
      <div className="popup card">
        <div className="avatar-container">
          <img src={zombieAvatar} alt="Zombie Avatar" className="avatar" />
        </div>
        <div className="content">
          <h2>Zombie Chat</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your Zombie Id"
            />
            <button type="submit">Enter GRAVEYARD</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
