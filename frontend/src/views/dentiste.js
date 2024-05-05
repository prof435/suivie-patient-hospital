import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/header';
import Footer from '../partials/footer';
// import './consultation.css'; // Import du fichier CSS pour le style

const dentiste = () => {
  const [douleurs, setDouleurs] = useState('');
  const [sensibilite, setSensibilite] = useState('');
  const [problemesGencives, setProblemesGencives] = useState('');
  // Rest of the state variables for other questions

  return (
    <>
      <Header />

      <h1>Informations du patient</h1>
      <p>Nom : <input type="text" required /></p>
      <p>Prénom : <input type="text" required /></p>
      <p>Date de naissance : <input type="date" required /></p>
      <p>Sexe : 
        <label><input type="radio" name="sexe" value="homme" required /> Homme</label>
        <label><input type="radio" name="sexe" value="femme" required /> Femme</label>
      </p>

      <h2>Questions dentaires</h2>
      <p>Avez-vous des douleurs ou des sensations douloureuses dans la bouche ou les dents ? 
        <label><input type="checkbox" name="douleurs" value="oui" onChange={() => setDouleurs('oui')} checked={douleurs === 'oui'} required /> Oui</label>
        <label><input type="checkbox" name="douleurs" value="non" onChange={() => setDouleurs('non')} checked={douleurs === 'non'} required /> Non</label>
      </p>
      <p>Avez-vous des problèmes de sensibilité dentaire (par exemple, aux aliments chauds ou froids) ? 
        <label><input type="checkbox" name="sensibilite" value="oui" onChange={() => setSensibilite('oui')} checked={sensibilite === 'oui'} required /> Oui</label>
        <label><input type="checkbox" name="sensibilite" value="non" onChange={() => setSensibilite('non')} checked={sensibilite === 'non'} required /> Non</label>
      </p>
      <p>Avez-vous des problèmes de gencives, tels que des saignements, des gonflements ou une mauvaise haleine ? 
        <label><input type="checkbox" name="problemesGencives" value="oui" onChange={() => setProblemesGencives('oui')} checked={problemesGencives === 'oui'} required /> Oui</label>
        <label><input type="checkbox" name="problemesGencives" value="non" onChange={() => setProblemesGencives('non')} checked={problemesGencives === 'non'} required /> Non</label>
      </p>
      {/* Rest of the dental questions with checkboxes */}

      <h2>Historique médical du patient</h2>
      {/* Rest of the medical history questions */}
      
      <h2>Antécédents médicaux</h2>
      {/* Rest of the medical background questions */}

      <h2>Historique familial</h2>
      {/* Rest of the family history questions */}

      <h2>Mode de vie et habitudes</h2>
      {/* Rest of the lifestyle and habits questions */}
      
      <h2>Systèmes spécifiques</h2>
      {/* Rest of the specific systems questions */}
      
      <h2>Historique des vaccinations</h2>
      {/* Rest of the vaccination history questions */}
      
      <h2>Questions préventives</h2>
      <button>Valider</button>
      {/* Rest of the preventive questions */}
      <Link to="/resultat dentiste" className="button">Soumettre</Link>
      <Footer/>
    </>
  );
};

export default dentiste;