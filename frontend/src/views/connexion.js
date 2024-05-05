import React, { useState } from 'react';
import './connexion.css';
//import './Actualite.css'; // Importation du fichier CSS personnalisé

const Connexion = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici le code pour gérer la soumission du formulaire
  };

  return (
    <>
      <h1>Se connecter</h1>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div className="actualite-container">
          <img src="/imgdepartments-1.jpg" alt="Centre de santé" className="center-img" /> {/* Ajout de l'image avec la classe "center-img" */}
          <div className="form-group">
            <label>Nom:</label>
            <input type="text" value={nom} onChange={handleNomChange} required />
          </div>
          <div className="form-group">
            <label>Prénom:</label>
            <input type="text" value={prenom} onChange={handlePrenomChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <label>Mot de passe:</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <div className="form-group">
            <button type="submit">Valider</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Connexion;