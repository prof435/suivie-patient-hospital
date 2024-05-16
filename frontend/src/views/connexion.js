import React, { useState } from 'react';
import { TopNav } from '../partials/header';

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
      const response = null //await axios.post('/login', { email, mot_de_passe: password });
      const { token } = response.data;

      // Stocker le token dans le stockage local ou dans un cookie
      localStorage.setItem('authToken', token);

      // Redirigez l'utilisateur vers une page protégée ou actualisez l'interface utilisateur
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur de connexion:', error.response.data.error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <>
      <TopNav />
      <div className="form-container"  >
        <h5>DimiSante Inscription</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
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
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Valider</button>
          </div>
          <div className="form-group">
            <p>
              Vous n'avez pas de compte chez-nous ?{' '}
              <a href="/Inscription">Inscription</a>
            </p>
          </div>
        </form>
      </div>
      <style jsx>{`
        .form-container {
          width: 40%;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f5f5f5;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form-container h1 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.5rem;
        }

        .form-group label {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .form-group input {
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }

        .form-group button {
          padding: 0.75rem 1.5rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }

        .form-group button:hover {
          background-color: #0056b3;
        }

        .form-group p {
          text-align: center;
          margin-top: 1rem;
        }

        .form-group a {
          color: #007bff;
          text-decoration: none;
        }

        .form-group a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Connexion;