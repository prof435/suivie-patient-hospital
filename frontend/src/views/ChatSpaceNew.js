import React from "react";
import './chat_new.css';

const ChatSpaceNew = ({ chatroom, user }) => {
  return (
    <div className="chat-space-container">
      
      <div className="chat-messages">
        {chatroom.Messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.UtilisateurId === user.id ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              {message.contenu}
              <span className="message-time">
                {new Date(message.createdAt).toLocaleTimeString()}
                {message.UtilisateurId === user.id && (
                  <span className={`message-status ${message.lu ? 'read' : message.recu ? 'received' : 'sent'}`}>
                    {message.lu ? '✔✔' : message.recu ? '✔' : '➤'}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Tapez un message..." />
        <button type="button">Envoyer</button>
      </div>
    </div>
  );
};

export default ChatSpaceNew;
