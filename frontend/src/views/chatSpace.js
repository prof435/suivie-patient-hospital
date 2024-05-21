
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Modal, Button, Dropdown } from 'react-bootstrap';
import moment from 'moment';
import ConsultationModal from './modaleditor';

const ChatSpace = ({ chatroom, user }) => {
  const [userConnected, setUserconnected] = useState(user);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState({ message: '', show: false, content: '', variant: 'info' });
  const [modalShow, setModalShow] = useState(false);

  const getChats = async (chatroomId) => {
    if (!chatroomId) return;
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`http://${window.location.hostname}:5000/chatrooms/${chatroomId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      setChats(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des chats :', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.post(
        `http://${window.location.hostname}:5000/chatrooms/${chatroom?.id}/messages`,
        { contenu: message },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        }
      );
      setMessage('');
      getChats(chatroom?.id); // Refresh chats after sending a message
    } catch (error) {
      setAlert({
        show: true,
        message: 'Erreur lors de l\'envoi du message.',
        variant: 'danger',
      });
      setTimeout(() => {
        setAlert({ show: false, message: '', variant: 'info' });
      }, 2000);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      await handleSubmit(e);
    }
  };

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleSave = async (content) => {
    const authToken = localStorage.getItem('authToken');
    // console.log(user);
    const patient = chats?.filter((chat)=>{
      return chat.UtilisateurId !== user?.id;
    })
    const data =  { contenu: content, medecinId: user?.id, patientId: patient[0].UtilisateurId};
    // console.log(patient);
    // console.log(data);
    // // return;
    try {
      await axios.post(
        `http://${window.location.hostname}:5000/consultation/rapport`,
       data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        }
      );
      getChats(chatroom?.id); // Refresh chats after saving the report
    } catch (error) {
      setAlert({
        show: true,
        message: 'Erreur lors de l\'enregistrement du rapport.',
        variant: 'danger',
      });
      setTimeout(() => {
        setAlert({ show: false, message: '', variant: 'info' });
      }, 2000);
    }
    handleModalClose();
  };

  useEffect(() => {
    if(!user){
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
            setUserconnected(res.data);
          } else {
            setAlert({ show: true, message: 'Une erreur s\'est produite !!', variant: 'danger' });
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUser();
    }
    if (chatroom?.id) {
      getChats(chatroom.id);
      const interval = setInterval(() => {
        getChats(chatroom.id);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [chatroom]);

  const formatDate = (date) => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const messageDate = moment(date).startOf('day');

    if (messageDate.isSame(today)) {
      return 'Aujourd\'hui';
    } else if (messageDate.isSame(yesterday)) {
      return 'Hier';
    } else {
      return moment(date).format('LL');
    }
  };

  const renderMessage = (chat, index) => {
    const isOutgoing = chat.UtilisateurId === user.id;
    const isSystemMessage = chat.UtilisateurId === null;
    const formattedDate = formatDate(chat.date_envoi);
    const isSameDay = index === 0 || formatDate(chats[index - 1].date_envoi) !== formattedDate;

    return (
      <React.Fragment key={chat.id}>
        {isSameDay && (
          <div className="date-separator" style={{ textAlign: 'center', margin: '10px 0', color: '#777' }}>
            <div style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#e0f7fa', borderRadius: '20px' }}>
              {formattedDate}
            </div>
          </div>
        )}
        {isSystemMessage ? (
          <div className="system-message" style={{ textAlign: 'center', margin: '10px 0', color: '#777' }}>
            <div style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#e0f7fa', borderRadius: '20px' }}>
              {chat.contenu}
            </div>
          </div>
        ) : (
          <div
            className={`message ${isOutgoing ? 'outgoing' : 'incoming'}`}
            style={{
              display: 'flex',
              justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                maxWidth: '60%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: isOutgoing ? '#dcf8c6' : 'white',
                position: 'relative',
              }}
            >
              {chat.contenu}
              <div style={{ textAlign: 'right', fontSize: '0.8em', color: '#888' }}>
                {moment(chat.date_envoi).format('HH:mm')}
                {isOutgoing && (
                  <span style={{ marginLeft: '5px' }}>
                    {chat.lu ? (
                      <i className="fa fa-check-double" style={{ color: 'green' }}></i>
                    ) : chat.recu ? (
                      <i className="fa fa-check-double"></i>
                    ) : (
                      <i className="fa fa-check"></i>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="chat-space">
      <div className="chat-header" style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
          <span>{user?.role === 'Medecin' ? `${chatroom?.Patient?.Utilisateur?.prenom} ${chatroom?.Patient?.Utilisateur?.nom}` : `${chatroom?.Medecin?.Utilisateur?.prenom} ${chatroom?.Medecin?.Utilisateur?.nom}`}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <i className="fa fa-search" style={{ marginRight: '10px' }}></i>
          
          <Dropdown>
            <Dropdown.Toggle variant="link" className="menu-btn">
                <i className="fas fa-ellipsis-v"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {user?.role === "Medecin" && (<Dropdown.Item  onClick={handleModalShow} href="#">Terminer la consultation</Dropdown.Item>)}
                <Dropdown.Item href="#/profile">Info de l'utilisateur</Dropdown.Item>
                <Dropdown.Item href="#/new-conversation">Fermer la discussion</Dropdown.Item>
                <Dropdown.Item href="#/logout">Effacer la discussion</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </div>
      </div>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
          <p>{alert.content}</p>
        </Alert>
      )}

      <div className="chat-messages" style={{ padding: '10px', overflowY: 'auto', height: 'calc(100vh - 200px)' }}>
        {chats.length > 0 ? (
          chats.map((chat, index) => renderMessage(chat, index))
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>Aucun message pour cette conversation.</p>
        )}
      </div>

      <div className="chat-input" style={{ padding: '10px', borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
        <input
          value={message}
          onKeyPress={handleKeyPress}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Tapez un message..."
          style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ddd', marginRight: '10px' }}
        />
        <button type="button" onClick={handleSubmit} style={{ padding: '10px 20px', borderRadius: '20px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          <i className="fa fa-paper-plane-o"></i> Envoyer
        </button>
      </div>

      <ConsultationModal show={modalShow} handleClose={handleModalClose} handleSave={handleSave} />
    </div>
  );
};

export default ChatSpace;
