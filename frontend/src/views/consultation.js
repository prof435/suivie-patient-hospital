import React from 'react';
import './consultation.css'; // Fichier CSS pour le style de la page
import videoIcon from './icons/video-icon.png';// Importation de l'icône pour l'appel vidéo
import audioIcon from './icons/audio-icon.png'; // Importation de l'icône pour l'appel audio
import messageIcon from './icons/message-icon.png'; // Importation de l'icône pour les messages

const Consultation = () => {
return (
    <div className="consultation">
      <h1>Faites vous consulter ici</h1>
      <div className="links-container">
        <a href="lien-de-l-appel-video" className="video-link">
          <img src={videoIcon} alt="Appel vidéo" className="icon" />
        <span>Appel vidéo</span>
    </a>
    <a href="lien-de-l-appel-audio" className="audio-link">
        <img src={audioIcon} alt="Appel audio" className="icon" />
        <span>Appel audio</span>
    </a><a href="lien-des-messages" className="message-link">
         <img src={messageIcon} alt="Messages" className="icon" />
        <span>Messages</span>
    </a>
      </div>
    </div>
  );
};

export default Consultation;   

//importer correctement les fichiers CSS et les images des icônes dans les emplacements appropriés de votre projet pour qu'ils soient accessibles à partir de ces chemins relatifs ('./consultation.css', './icons/video-icon.png', 
