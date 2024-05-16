import React, { useEffect, useState } from 'react';
import { TopNav } from '../partials/header';
import Footer from '../partials/footer';
// import axios from 'axios';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typeCompte, setTypeCompte] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = null; //await axios.post('http://localhost:5000/register', {
      //   nom,
      //   prenom,
      //   email,
      //   mot_de_passe: password,
      //   role: typeCompte,
      //   date_de_naissance: '1990-01-01' // Vous devrez remplacer cette valeur par la date de naissance de l'utilisateur
      // });

      console.log('Utilisateur créé :', response.data);
      // Vous pouvez également rediriger l'utilisateur vers une autre page ou afficher un message de succès
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.response.data.error);
      // Vous pouvez afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <>
      <TopNav />

      <div style={{ width: '51%', position: 'relative', left: '25%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '50px', marginBottom: '30px' }}>DimiSante Inscription</h1>
        <div className='form-container' style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', margin: '0 auto' }}>
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
              <label>Type de compte: </label>
              <select className="form-select" value={typeCompte} onChange={(e) => { setTypeCompte(e.target.value) }}>
                <option value="">-----------</option>
                <option value="Patient">Patient</option>
                <option value="Medecin">Medecin</option>
              </select>
            </div>
            <div>
              <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '16px', marginTop: '10%' }} type="submit">Valider</button>
            </div>

          </form>
        </div>
        <div>
          <h4 style={{ textAlign: 'center', marginTop: '20px' }}>Vous possédez déjà un compte ? <a href="/login" style={{ color: '#4CAF50', textDecoration: 'none' }}>Connectez-vous</a></h4>
        </div>
      </div>

    </>
  );
};

export default Inscription;
