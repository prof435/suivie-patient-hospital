import React, { useState, useEffect } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import {NavBAr} from "../partials/header";
import Footer from "../partials/footer";
import axios from "axios";
import Sidebar from "./chatLeftSide";
import ChatSpace from "./chatSpace";
import './Chat.css';

const ChatPage = () => {
  const [alert, setAlert] = useState({ message: '', show: false, variant: 'info' });
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const res = await axios.get(`http://${window.location.hostname}:5000/user`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.status === 200) {
          setUser(res.data);
        } else {
          setAlert({ show: true, message: 'Une erreur s\'est produite !!', variant: 'danger' });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <NavBAr />
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      <div  style={{  width:"92%%", display:"flex",  flexDirection:"row", marginRight:"4%"}}   className="mt-4 chat-container container-fluid">
        
        <Col md={3} style={{width:"min-content"}}  className="chat-sidebar">
            {user && <Sidebar user={user} onSelectChat={setSelectedChat} />}
        </Col>
        <Col md={10} className=" chat-space">
            {selectedChat ? (
            <ChatSpace chatroom={selectedChat} user={user} />
            ) : (
            <div className="chat-placeholder">Sélectionnez une conversation pour commencer à discuter</div>
            )}
        </Col>
        
        </div>

      <Footer />
    </>
  );
};

export default ChatPage;
