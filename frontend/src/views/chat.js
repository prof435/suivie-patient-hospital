
import React, { useEffect, useState } from "react";
import { Alert, Container, Row, Col, Modal, Spinner } from "react-bootstrap";
import NavBar from "../partials/header";
import Footer from "../partials/footer";
import axios from "axios";
import ChatSpaceNew from "./ChatSpaceNew";
// import './Chat.css';

const ChatPage = () => {
  const [chatrooms, setChatRooms] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alert, setAlert] = useState({ message: '', show: false, variant: 'info' });
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (!loaded) {
      getUser();
      getChatRooms();
      setLoaded(true);
    } else {
      const interval = setInterval(() => {
        getChatRooms();
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [loaded]);

  const getUser = async () => {
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

  const getChatRooms = async () => {
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
      } else {
        setAlert({ show: true, message: 'Une erreur s\'est produite !!', variant: 'danger' });
      }
    } catch (error) {
      console.error(error);
      setAlert({ show: true, message: error?.response?.data?.message || 'Erreur de récupération des salles de chat', variant: 'danger' });
    }
  };

  return (
    <>
      <NavBar />
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      <Container fluid className="mt-4 chat-container">
        <Row className="no-gutters">
          <Col md={4} className="chat-sidebar">
            <div className="ms-user clearfix">
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar pull-left" />
              <div>Connecté en tant que <br />{user?.email}</div>
            </div>
            <div className="list-group lg-alt">
              {chatrooms.map((chatroom) => (
                <div key={chatroom.id} className="list-group-item media" onClick={() => setSelectedChat(chatroom)}>
                  <div className="pull-left">
                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="img-avatar circle" />
                  </div>
                  <div className="media-body">
                    <div className="list-group-item-heading">{user?.role === "Medecin" ? chatroom.Patient.Utilisateur.nom : chatroom.Medecin.Utilisateur.nom}</div>
                    <div className="list-group-item-text c-gray">
                      {chatroom.Messages[0]?.contenu.substring(0, 15)} ...
                    </div>
                  </div>
                  <small className="text-muted">
                    {new Date(chatroom.Messages[0]?.createdAt).toLocaleTimeString()}
                  </small>
                </div>
              ))}
            </div>
          </Col>
          <Col md={8} className="chat-space">
            {selectedChat ? (
              <ChatSpaceNew chatroom={selectedChat} user={user} />
            ) : (
              <div className="chat-placeholder">Sélectionnez une conversation pour commencer à discuter</div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ChatPage;
