import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SecureMessaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = io('https://your-socket-io-server-url'); // Remplacez par l'URL de votre serveur Socket.IO

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // Envoyer le message via Socket.IO
    // Remplacez 'your-socket-io-server-url' par l'URL de votre serveur Socket.IO
    const socket = io('https://your-socket-io-server-url');
    socket.emit('message', newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default SecureMessaging;