import React, { useEffect, useState } from 'react';
import Header from '../partials/header';
import Footer from '../partials/footer';

const  inscription = () => {
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
    <div>
      <h1>  inscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" value={nom} onChange={handleNomChange} required />
        </div>
        <div>
          <label>Prénom:</label>
          <input type="text" value={prenom} onChange={handlePrenomChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <button type="submit">valider</button>
        </div>
        
      </form>
    </div>
  );
};

export default inscription;



