import React, { useEffect, useState } from "react";  
import { Alert } from "react-bootstrap";
import { NavBAr, TopNav } from "../partials/header";
import Footer from "../partials/footer";
import axios from "axios";
import './chat.css';
import ChatSpace from "./chatSpace";

const ChatRoom = ()=>{

    const [chatrooms, setChatRooms] = useState(null);
    const [loaded, setLoaded] = useState(null);
    const [alert, setAlert] = useState({message:'', show:false, variant:'info'});
    const [user, setUser] = useState(null);
    const [selectetChat, setSelectetChat] = useState(null);

    const getUser = async()=>{
        setUser(null);
        const authToken = localStorage.getItem('authToken');
        await axios.get(`http://${window.location.hostname}:5000/user`, {
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
        })
    };

    const getChatRooms = async()=>{
        const authToken = localStorage.getItem('authToken');
        await axios.get(`http://${window.location.hostname}:5000/chatrooms`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type' : 'application/json'
            }
        })
       .then((response)=>{
        console.log(response);
        if(response.status === 200){
            setChatRooms(response.data);
            setLoaded(true);
        }
        else{
            alert("Une erreur s'est produite!!");
        }
    }).catch((error)=>{
        console.clear();
        if (error?.response?.data?.message) {
            setAlert({
                variant:'danger',
                message: error?.response?.data?.message,
                show:true
            });
        }
        console.warn(error);
    })
    }

    useEffect(()=>{
        if(!loaded){
            getUser();
            getChatRooms();
            setLoaded(true);
        }else{
            const interval = setInterval(() => {
                getChatRooms();
            }, 20000);
            return () => clearInterval(interval);
        }
    }, [chatrooms, user])

    document.querySelector('#ms-menu-trigger')?.addEventListener('click', function() {
        if (document.querySelector('.ms-menu.toggled')) {
            document.querySelector('.ms-menu')?.classList.remove('toggled');
        } else {
            document.querySelector('.ms-menu')?.classList.add('toggled');
        }
    });

    return(
        <>
            <NavBAr />
            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                    {alert.message}
                </Alert>
            )}
            <div className="container mt-4 bootstrap snippets bootdey">
                <div className="tile tile-alt" id="messages-main">
                    <div className="ms-menu">
                        <div className="ms-user clearfix">
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar pull-left" />
                            <div>Connecté en tant que <br />{user?.email}</div>
                        </div>

                        <div className="list-group lg-alt">
                            {chatrooms?.map((chatroom)=>(
                                <a key={chatroom?.id} className="list-group-item media" href="#" onClick={()=>setSelectetChat(chatroom)}>
                                    <div className="pull-left">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="img-avatar" />
                                    </div>
                                    <div className="media-body">
                                        <small className="list-group-item-heading">{user?.role === "Medecin" ? chatroom?.Patient?.Utilisateur?.nom : chatroom?.Medecin?.Utilisateur?.prenom}</small><br/>
                                        <small className="list-group-item-text c-gray">{chatroom?.Messages[0]?.contenu.substring(0, 15)} ..</small>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <ChatSpace chatroom={selectetChat} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ChatRoom;
