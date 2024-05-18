import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


const ChatSpace = ({chatroom})=>{
    const [chats, setChatRooms] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState(null);
    const [alert, setAlert] = useState({message:'', show:false, content:'', variant:'info'});
    const [user, setUser] = useState(null);


    const getUser = async()=>{
        setAlert(
            {show:false, 
            variant:'info',
            message:'',
            content:''}
        );
        setUser(null);
        const authToken = localStorage.getItem('authToken');
        await axios.get("http://localhost:5000/user", {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            'Content-Type' : 'application/json'
              
            }
        }).then((res)=>{
            if(res.status === 200){
                setUser(res.data);
            }
            else{
                alert("Une erreur s'est produite !!");
            }
        }).catch((err)=>{
            setAlert({
                show:true, 
                variant:'danger',
                message:'Une erreur s\'est produite',
                content: err?.response?.data?.message
            })

            setTimeout(() => {
                setAlert(
                    {show:false, 
                    variant:'info',
                    message:'',
                    content:''}
                );
            }, 5000);
        })
    };

    const getChats = async function(chatroomId){
        try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:5000/chatrooms/${chatroomId}`, {headers: {
                'Authorization': `Bearer ${authToken}`,
            'Content-Type' : 'application/json'
            }}  );
            setChatRooms(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des chats :', error);
        }
    }



  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    try {
      await axios.post(
        `http://localhost:5000/chatrooms/${chatroom?.id}/messages`,
        { contenu: message },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type' : 'application/json'
          },
        }
      );

      setAlert({
        show: true,
        message: 'Message envoyé avec succès!',
        variant: 'success',
      });
      setMessage('');
    } catch (error) {
      setAlert({
        show: true,
        message: 'Erreur lors de l\'envoi du message.',
        variant: 'danger',
      });
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      await handleSubmit(e);
    }
  };


    useEffect(()=>{
        if(!loaded){
            const token = localStorage.getItem('authToken');
            if(token){
                getUser();
                getChats(chatroom?.id);
                setLoaded(true);
            }else{
                window.location.href = '/login';
            }
        }
        else{
            setTimeout(() => {
                getChats(chatroom?.id)
            }, 10000);
        }
    });
    return(
        <div class="ms-body">
                                <div class="action-header clearfix">
                                   

                                    <div class="pull-left hidden-xs">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="img-avatar m-r-10" />
                                        <div class="lv-avatar pull-left">

                                        </div>
                                        <span>{user?.role == 'Medecin' ? chatroom?.Patient?.Utilisateur?.prenom + " " + chatroom?.Patient?.Utilisateur?.nom : chatroom?.Medecin?.Utilisateur?.prenom + " " + chatroom?.Medecin?.Utilisateur?.nom }</span>
                                    </div>

                                    <ul class="ah-actions actions">
                                        <li>
                                            <a href="" title="Supprimer la conversation">
                                                <i class="fa fa-trash"></i>
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>
                                {alert.show && (
                                    <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                                        {alert.message}
                                        <p>{alert.content}</p>
                                    </Alert>
                                    )}
                                {chats?.length ? chats.map((chat)=>(
                                    <>
                                        {user?.id === chat?.UtilisateurId ? (
                                            <div key={chat.id} class="message-feed media">
                                                <div class="pull-left">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="img-avatar" />
                                                </div>
                                                <div class="media-body">
                                                    <div class="mf-content">
                                                        {chat?.contenu}
                                                    </div>
                                                    <small class="mf-date"><i class="fa fa-clock-o"></i> {chat?.date_envoi}</small>
                                                </div>
                                            </div>
                                        ) : (

                                            <div class="message-feed right">
                                                <div class="pull-right">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="img-avatar" />
                                                </div>
                                                <div class="media-body">
                                                    <div class="mf-content">
                                                        {chat?.contenu}
                                                    </div>
                                                    <small class="mf-date"><i class="fa fa-clock-o"></i> {chat?.date_envoi}</small>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )) :    chatroom?.Messages?.map((chat)=>(
                                    <>
                                        {user?.id === chat?.UtilisateurId ? (
                                            <div  key={chat?.id} class="message-feed media">
                                                <div class="pull-left">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="img-avatar" />
                                                </div>
                                                <div class="media-body">
                                                    <div class="mf-content">
                                                        {chat?.contenu}
                                                    </div>
                                                    <small class="mf-date"><i class="fa fa-clock-o"></i> {chat?.datecreatedAt_envoi}</small>
                                                </div>
                                            </div>
                                        ) : (

                                            <div class="message-feed right">
                                                <div class="pull-right">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="img-avatar" />
                                                </div>
                                                <div class="media-body">
                                                    <div class="mf-content">
                                                        {chat?.contenu}
                                                    </div>
                                                    <small class="mf-date"><i class="fa fa-clock-o"></i> {chat?.createdAt}</small>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                                                            
                                ))}
                                

                                

                                
                                

                                <div class="msb-reply">
                                    <textarea value={message}  onKeyPress={handleKeyPress}  onChange={(e)=>setMessage(e.target.value)} placeholder="What's on your mind..."></textarea>
                                    <button><i class="fa fa-paper-plane-o"></i></button>
                                </div>
                            </div>
    );
};



export default ChatSpace;