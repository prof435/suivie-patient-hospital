import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/header';
import Footer from '../partials/footer';
// import './consultation.css'; // Import du fichier CSS pour le style

const MédecinGénéraliste = () => {
  return (
    <>
      <Header />

      <h1>Informations du patient</h1>
      <p>Nom : <input type="text" required /></p>
      <p>Prénom : <input type="text" required /></p>
      <p>Date de naissanc
      <p>Sexe : 
        <label><input type="radio" name="sexe" value="homme" required /> Homme</label>
        <label><input type="radio" name="sexe" value="femme" required /> Femme</label>
      </p>
      {/* Ajoutez d'autres informations personnelles obligatoires ici */}
      
      <h2>Historique médical du patient</h2>
      <p>Quelle maladie avez-vous eu la dernière fois ? <input type="text" required /></p>
      <p>Avez-vous mal à la tête ? 
        <label><input type="radio" name="question2" value="oui" required /> Oui</label>
        <label><input type="radio" name="question2" value="non" required /> Non</label>
      </p>
      <p>Avez-vous mal au ventre ? 
        <label><input type="radio" name="question3" value="oui" required /> Oui</label>
        <label><input type="radio" name="question3" value="non" required /> Non</label>
      </p>
      <p>Avez-vous pris votre température ? 
        <label><input type="radio" name="question4" value="oui" required /> Oui</label>
        <label><input type="radio" name="question4" value="non" required /> Non</label>
      </p>
      {/* Ajoutez d'autres questions de symptômes ici */}
      {/* Répétez le même modèle pour les autres questions de symptômes */}
      
      <h2>Antécédents médicaux</h2>
      <p>Avez-vous des problèmes de santé chroniques ou des maladies préexistantes ? <input type="text" required /></p>
      <p>Avez-vous des allergies connues aux médicaments, aux aliments ou à d'autres substances ? <input type="text" required /></p>
      <p>Avez-vous subi des interventions chirurgicales auparavant ? 
        <label><input type="radio" name="question5" value="oui" required /> Oui</label>
        <label><input type="radio" name="question5" value="non" required /> Non</label>
      </p>
      <p>Prenez-vous actuellement des médicaments ou des suppléments ? <input type="text" required /></p>

      <h2>Historique familial</h2>
      <p>Y a-t-il des antécédents familiaux de maladies chroniques ou héréditaires ? <input type="text" required /></p>
      <p>Des membres de votre famille ont-ils déjà été diagnostiqués avec des maladies spécifiques ? <input type="text" required /></p>

      <h2>Mode de vie et habitudes</h2>
      <p>Quelle est votre alimentation habituelle ? <input type="text" required /></p>
      <p>Pratiquez-vous une activité physique régulière ? 
        <label><input type="radio" name="question6" value="oui" required /> Oui</label>
        <label><input type="radio" name="question6" value="non" required /> Non</label>
      </p>
      <p>Fumez-vous ou consommez-vous de l'alcool ? 
        <label><input type="radio" name="question7" value="oui" required /> Oui</label>
        <label><input type="radio" name="question7" value="non" required /> Non</label>
      </p>
      <p>Comment est votre qualité de sommeil ? <input type="text" required /></p>

      <h2>Systèmes spécifiques</h2>
      <p>Pour les problèmes respiratoires :
        Avez-vous une toux, des difficultés respiratoires ou des douleurs thoraciques ? <input type="text" required />
      </p>
      <p>Pour les problèmes gastro-intestinaux :
        Avez-vous des douleurs abdominales, des nausées, des vomissements ou des problèmes de digestion ? <input type="text" required />
      </p>
      <p>Pour les problèmes dermatologiques :
        Avez-vous des éruptions cutanées, des démangeaisons ou des changements de peau récents ? <input type="text" required />
      </p>
      <p>Pour les problèmes musculo-squelettiques :
        Avez-vous des douleurs articulaires, des raideurs musculaires ou des blessures récentes ? <input type="text" required />
      </p>

      <h2>Historique des vaccinations</h2>
      <p>Avez-vous reçu toutes les vaccinations recommandées pour votre âge ? 
        <label><input type="radio" name="question8" value="oui" required /> Oui</label>
        <label><input type="radio" name="question8" value="non" required /> Non</label>
      </p>
      <p>Avez-vous besoin de mises à jour de vos vaccinations ? 
        <label><input type="radio" name="question9" value="oui" required /> Oui</label>
        <label><input type="radio" name="question9" value="non" required /> Non</label>
      </p>

      <h2>Questions préventives</h2>
      <p>Avez-vous subi des dépistages de routine, tels que des examens sanguins, des mammographies, des coloscopies, etc. ? 
        <label><input type="radio" name="question10" value="oui" required /> Oui</label>
        <label><input type="radio" name="question10" value="non" required /> Non</label>
      </p>
      <p>Avez-vous des préoccupations particulières en matière de santé mentale, comme le stress, l'anxiété ou la dépression ? 
        <label><input type="radio" name="question11" value="oui" required /> Oui</label>
        <label><input type="radio" name="question11" value="non" required /> Non</label>
      </p>
      <Link to="/MedecinGeneraliste" className="button">Soumettre</Link>
      <Footer />
    </>
  );
};

export default MédecinGénéraliste;