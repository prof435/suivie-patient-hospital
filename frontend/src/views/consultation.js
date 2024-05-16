import React from 'react';
import { Link } from 'react-router-dom';
import MedecinGeneraliste from './MedecinGeneraliste';
import Header from '../partials/header';
import Footer from '../partials/footer';
// import './consultation.css'; // Import du fichier CSS pour le style

const Consultation = () => {
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