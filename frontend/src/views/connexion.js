import React, { useState } from 'react';
import { TopNav } from '../partials/header';
import axios from 'axios';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, mot_de_passe: password });
      const { token } = response.data;

      // Stocker le token dans le stockage local ou dans un cookie
      localStorage.setItem('authToken', token);

      // Redirigez l'utilisateur vers une page protégée ou actualisez l'interface utilisateur
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur de connexion:', error.response.data.error);
      // Afficher un message d'erreur à l'utilisateur
      alert('Erreur de connexion: ' + error.response.data.error);
    }
  };

  return (
    <>
      <TopNav />
      <div style={{ width: '51%', position: 'relative', left: '25%', marginTop: '50px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>DimiSante Connexion</h1>
        <div className='form-container' style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <button
                style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '16px', marginTop: '10%' }}
                type="submit"
              >
                Valider
              </button>
            </div>
            <div className="form-group" style={{ textAlign: 'center', marginTop: '20px' }}>
              <p>
                Vous n'avez pas de compte chez nous ? <a href="/Inscription" style={{ color: '#4CAF50', textDecoration: 'none' }}>Inscription</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Connexion;
