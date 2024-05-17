import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import MedecinGeneraliste from './MedecinGeneraliste';
import Header from '../partials/header';
import Footer from '../partials/footer';
// import './consultation.css'; // Import du fichier CSS pour le style

const Consultation = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: '',
    dontKnow: false
  });

  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken')
    const data = {...formData, token: token};
    try {
      const response = await axios.post('http://localhost:5000/api/consultation', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        
      }});
      
      setAlert({
        show: true,
        message: 'Demande de consultation soumise avec succès!',
        variant: 'success'
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Erreur lors de la soumission de la demande de consultation.',
        variant: 'danger'
      });
    }
  };


  return (
    <>
      <Header />
      <div className="container " >
        <h1> Commwent vous-sentez vous aujourd'hui ?</h1>
        <div class="container" style={{display:"inline-bloc"}}>
          <br/>
          <form className='form-container'>
            <div className='form-group'>
              <label >Décrivez votre problème</label>
              <textarea className='forn-control' placeholder="J'ai..." rows="4"></textarea>
            </div>
          <br/>

            <div className='form-group'>
              <label>Quel service est le mieux adapté à vos besoins ?</label>
               <label>Je ne sais pas <input    type='checkbox'/></label>
              <select className='form-select'>
                <option value="">----------------</option>
                <option value="Médecine générale">Médecine générale</option>
                <option value="Ophtalmologie">Ophtalmologie</option>
                <option value="Dentisterie">Dentisterie</option>
                <option value="Psychologie">Psychologie</option>
                <option value="Pédiatrie">Pédiatrie</option>
                {/* Ajouter cinq services supplémentaires ici */}
                <option value="Gynécologie">Gynécologie</option>
                <option value="Dermatologie">Dermatologie</option>
                <option value="Chirurgie">Chirurgie</option>
                <option value="Orthopédie">Orthopédie</option>
                <option value="Cardiologie">Cardiologie</option>
              </select>
            </div>
          <br/>
            <div className='form-group'>
              <button className='btn btn-info'>Soumettre</button>
            </div>
    </form>
  </div>
        

        <div className="secure-communication">
          <h2>Communication sécurisée</h2>
          {/* Intégrez ici le système de messagerie sécurisé */}
        </div>

        <div className="alerts-reminders">
          <h2>Alertes et rappels</h2>
          {/* Intégrez ici le système d'alertes et de rappels automatisés */}
        </div>

        <div className="education-resources">
          <h2>Éducation et ressources</h2>
          {/* Fournissez ici des ressources éducatives pertinentes */}
        </div>
      </div>
  
      <Footer />
    </>
  );
};

export default Consultation;
