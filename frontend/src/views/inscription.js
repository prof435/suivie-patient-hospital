import React, { useState } from 'react';
import axios from 'axios';
import { TopNav } from '../partials/header';
import Footer from '../partials/footer';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typeCompte, setTypeCompte] = useState('');
  const [numero_de_telephone, setNumeroDeTelephone] = useState('');
  const [message, setMessage] = useState({ type: '', content: '' });

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
    setMessage({content: '', type: 'none'});

    try {
      const response = await axios.post(`http://${window.location.hostname}:5000/register`, {headers:{
      'Content-Type' : 'application/json'}, data:{
        nom,
        prenom,
        email,
        mot_de_passe: password,
        role: typeCompte,
        numero_de_telephone: numero_de_telephone,
        date_de_naissance: '1990-01-01' // Vous devrez remplacer cette valeur par la date de naissance de l'utilisateur
      }});

      setMessage({ type: 'success', content: 'Utilisateur créé avec succès!' });
      setEmail('');
      setNom('');
      setPassword('');
      setNumeroDeTelephone('');
      setTypeCompte('');
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (error) {
      setMessage({ type: 'danger', content: 'Erreur lors de l\'inscription : ' + error.response.data.error });
      console.error('Erreur lors de l\'inscription :', error.response.data.error);
    }
  };

  return (
    <>
      <TopNav />

      <div className="container mt-5" style={{ width: '50%' }}>
        <h1 className="text-center mb-4">DimiSante Inscription</h1>
        <div className="card">
          <div className="card-body">
            {message.content && (
              <div className={`alert alert-${message.type}`} role="alert">
                {message.content}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom:</label>
                <input type="text" className="form-control" id="nom" value={nom} onChange={handleNomChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom:</label>
                <input type="text" className="form-control" id="prenom" value={prenom} onChange={handlePrenomChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Numero de Téléphone:</label>
                <input type="tel" className="form-control" id="numeroTel" value={numero_de_telephone} onChange={(e)=>{setNumeroDeTelephone(e.target.value)}} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe:</label>
                <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="typeCompte" className="form-label">Type de compte:</label>
                <select className="form-select" id="typeCompte" value={typeCompte} onChange={(e) => { setTypeCompte(e.target.value) }} required>
                  <option value="">-----------</option>
                  <option value="Patient">Patient</option>
                  <option value="Medecin">Medecin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success w-100">Valider</button>
            </form>
          </div>
        </div>
        <div className="text-center mt-3">
          <h4>Vous possédez déjà un compte ? <a href="/login" style={{ color: '#4CAF50', textDecoration: 'none' }}>Connectez-vous</a></h4>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Inscription;
