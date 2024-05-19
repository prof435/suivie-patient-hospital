import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import moment from 'moment';
import ConsultationModal from './modaleditor';

const ChatSpace = ({ chatroom }) => {
    const [chats, setChats] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState({ message: '', show: false, content: '', variant: 'info' });
    const [user, setUser] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    /// recuperer les informations de l'utilisateur connecté
    const getUser = async () => {
        setAlert({ show: false, variant: 'info', message: '', content: '' });
        setUser(null);
        const authToken = localStorage.getItem('authToken');
        await axios.get(`http://${window.location.hostname}:5000/user`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status === 200) {
                setUser(res.data);
            } else {
                alert("Une erreur s'est produite !!");
            }
        }).catch((err) => {
            setAlert({
                show: true,
                variant: 'danger',
                message: 'Une erreur s\'est produite',
                content: err?.response?.data?.message
            });
            setTimeout(() => {
                setAlert({ show: false, variant: 'info', message: '', content: '' });
            }, 5000);
        });
    };


    //efficher et fermer le modal
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);


    //enrigistrer le rapport de consultion
    const handleSave = async(data) => {
        console.log('Data saved:', data);
        const authToken = localStorage.getItem('authToken');
        try {
            await axios.post(
                `http://${window.location.hostname}:5000/consultation/rapport`,
                { contenu: data },
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
        handleModalClose();
    };

    const handleDelete = () => {
        handleModalClose();
    };





    // recuperer les message de la discussion
    const getChats = async (chatroomId) => {
        if (!chatroomId) {
            return;
        }
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


    //enregistrer le message
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

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem('authToken');
            if (token) {
                getUser();
                getChats(chatroom?.id);
                setLoaded(true);
            } else {
                window.location.href = '/login';
            }
        }
    }, [chatroom]);

    useEffect(() => {
        const interval = setInterval(() => {
            getChats(chatroom?.id);
        }, 2000);
        return () => clearInterval(interval);
    }, [chatroom]);

    return (
        <div className="ms-body">
            <div className="action-header clearfix">
                <div className="pull-left hidden-xs">
                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="img-avatar m-r-10" />
                    <span>{user?.role === 'Medecin' ? `${chatroom?.Patient?.Utilisateur?.prenom} ${chatroom?.Patient?.Utilisateur?.nom}` : `${chatroom?.Medecin?.Utilisateur?.prenom} ${chatroom?.Medecin?.Utilisateur?.nom}`}</span>
                </div>
                <ul className="ah-actions actions">
                    <li>
                        <a href="#" title="Supprimer la conversation">
                            <i className="fa fa-trash"></i>
                        </a>
                    </li>
                    {user?.role === "Medecin" && (
                        <li>
                            <a href="#" onClick={handleModalShow} className='btn btn-success' title="Terminer la consultation"> Terminer
                                <i className="fa fa-lock"></i>
                            </a>
                            <ConsultationModal
                                show={modalShow}
                                handleClose={handleModalClose}
                                handleSave={handleSave}
                                handleDelete={handleDelete}
                            />
                        </li>
                    )}
                </ul>
            </div>
            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                    {alert.message}
                    <p>{alert.content}</p>
                </Alert>
            )}
            {chats?.length ? chats.map((chat) => (
                <>
                    {chat?.UtilisateurId === null ? (
                        <div key={chat.id} className="message-feed system-message">
                            <div className="media-body">
                                <div className="mf-content">
                                    {chat?.contenu}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={chat.id} className={`message-feed ${user?.id === chat?.UtilisateurId ? 'right':'media'}`}>
                            <div className={user?.id === chat?.UtilisateurId ? 'pull-left' : 'pull-right'}>
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar" />
                            </div>
                            <div className="media-body">
                                <div className="mf-content">
                                    {chat?.contenu}
                                </div>
                                <small className="mf-date"><i className="fa fa-clock-o"></i> {moment(chat?.date_envoi).fromNow()}</small>
                            </div>
                        </div>
                    )}
                </>
            )) : chatroom?.Messages?.map((chat) => (
                <div key={chat?.id} className={`message-feed ${user?.id === chat?.UtilisateurId ?  'right':'media'}`}>
                    <div className={user?.id === chat?.UtilisateurId ? 'pull-left' : 'pull-right'}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar" />
                    </div>
                    <div className="media-body">
                        <div className="mf-content">
                            {chat?.contenu}
                        </div>
                        <small className="mf-date"><i className="fa fa-clock-o"></i> {moment(chat?.date_envoi).fromNow()}</small>
                    </div>
                </div>
            ))}

            <div className="msb-reply">
                <textarea value={message} onKeyPress={handleKeyPress} onChange={(e) => setMessage(e.target.value)} placeholder="What's on your mind..."></textarea>
                <button onClick={handleSubmit}><i className="fa fa-paper-plane-o"></i></button>
            </div>
        </div>
    );
};

export default ChatSpace;
