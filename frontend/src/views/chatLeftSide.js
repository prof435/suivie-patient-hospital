import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import './chatLeftSide.css';

const Sidebar = ({ user, onSelectChat }) => {
  const [chatrooms, setChatRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`http://${window.location.hostname}:5000/chatrooms`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          setChatRooms(response.data);
        }
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  const filteredChatRooms = chatrooms.filter(chatroom => 
    chatroom?.Patient?.Utilisateur?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chatroom?.Medecin?.Utilisateur?.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={user.profilePicture || "https://bootdey.com/img/Content/avatar/avatar1.png"} alt="Profile" className="img-avatar" />
        <button className="new-conversation-btn">Nouvelle Conversation</button>
        <Dropdown>
          <Dropdown.Toggle variant="link" className="menu-btn">
            <i className="fas fa-ellipsis-v"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/profile">Profil</Dropdown.Item>
            <Dropdown.Item href="#/new-conversation">Nouvelle Conversation</Dropdown.Item>
            <Dropdown.Item href="#/logout">Déconnexion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Rechercher..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className="chat-list">
        {filteredChatRooms?.map(chatroom => (
          <div key={chatroom.id} className="chat-list-item" onClick={() => onSelectChat(chatroom)}>
            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="User" className="img-avatar" />
            <div className="chat-info">
              <div className="chat-name">
                {chatroom?.Patient ? chatroom?.Patient.Utilisateur.nom.length > 15 ? chatroom?.Patient?.Utilisateur.nom.substring(0, 12) + "..." : chatroom?.Medecin?.Utilisateur.nom :chatroom?.Medecin.Utilisateur.nom.length > 15 ? chatroom?.Medecin?.Utilisateur.nom.substring(0, 12) + "..." : chatroom?.Medecin?.Utilisateur.nom}
              </div>
              <div className="chat-message">
                {chatroom?.Messages[0]?.UtilisateurId === user.id ? (
                  <>
                    <i className={`fas fa-check ${chatroom.Messages[0]?.lu ? 'read' : chatroom.Messages[0]?.recu ? 'received' : 'sent'}`}></i>
                  </>
                ) : null}
                {chatroom?.Messages[0]?.contenu.length > 20 ? chatroom.Messages[0]?.contenu.substring(0, 17) + "..." : chatroom.Messages[0]?.contenu}
              </div>
            </div>
            <div className="chat-time">
              {new Date(chatroom?.Messages[0]?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <hr className="separator" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
