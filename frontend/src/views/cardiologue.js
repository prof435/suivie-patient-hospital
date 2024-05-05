import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/header';
import Footer from '../partials/footer';
// import './consultation.css'; // Import du fichier CSS pour le style

const Cardiologue = () => {
  const [symptomes, setSymptomes] = useState('');
  const [antecedentsFamiliaux, setAntecedentsFamiliaux] = useState('');
  const [diagnosticAnterieur, setDiagnosticAnterieur] = useState('');
  const [medicaments, setMedicaments] = useState('');
  const [allergiesMedicaments, setAllergiesMedicaments] = useState('');
  const [tensionArterielle, setTensionArterielle] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [tabagisme, setTabagisme] = useState('');
  const [antecedentsDiabete, setAntecedentsDiabete] = useState('');
  const [routineExercice, setRoutineExercice] = useState('');
  const [restrictionsAlimentaires, setRestrictionsAlimentaires] = useState('');
  const [antecedentsCaillots, setAntecedentsCaillots] = useState('');
  const [problemesSommeil, setProblemesSommeil] = useState('');
  const [stressAnxiete, setStressAnxiete] = useState('');
  const [questionsPreoccupations, setQuestionsPreoccupations] = useState('');

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

      <h2>Questions cardiologiques</h2>
      <p>Quels sont vos symptômes actuels ? (essoufflement, douleurs thoraciques, palpitations, fatigue, etc.)</p>
      <input type="text" value={symptomes} onChange={e => setSymptomes(e.target.value)} />

      <p>Avez-vous des antécédents familiaux de maladies cardiaques ?</p>
      <label><input type="radio" name="antecedentsFamiliaux" value="oui" required /> Oui</label>
      <label><input type="radio" name="antecedentsFamiliaux" value="non" required /> Non</label>

      <p>Avez-vous déjà été diagnostiqué(e) avec une maladie cardiaque ou avez-vous subi des interventions cardiaques auparavant ?</p>
      <label><input type="radio" name="diagnosticAnterieur" value="oui" required /> Oui</label>
      <label><input type="radio" name="diagnosticAnterieur" value="non" required /> Non</label>

      <p>Prenez-vous des médicaments actuellement ? Si oui, lesquels ?</p>
      <input type="text" value={medicaments} onChange={e => setMedicaments(e.target.value)} />

      <p>Avez-vous des allergies connues aux médicaments, en particulier ceux liés au cœur ?</p>
      <label><input type="radio" name="allergiesMedicaments" value="oui" required /> Oui</label>
      <label><input type="radio" name="allergiesMedicaments" value="non" required /> Non</label>

      <p>Avez-vous des problèmes de tension artérielle élevée ou basse ?</p>
      <label><input type="radio" name="tensionArterielle" value="oui" required /> Oui</label>
      <label><input type="radio" name="tensionArterielle" value="non" required /> Non</label>

      <p>Avez-vous des problèmes de cholestérol élevé ou des antécédents de maladies vasculaires ?</p>
      <label><input type="radio" name="cholesterol" value="oui" required /> Oui</label>
      <label><input type="radio" name="cholesterol" value="non" required/> Non</label>

      <p>Êtes-vous fumeur(euse) ?</p>
      <label><input type="radio" name="tabagisme" value="oui" required /> Oui</label>
      <label><input type="radio" name="tabagisme" value="non" required /> Non</label>

      <p>Avez-vous des antécédents de diabète ?</p>
      <label><input type="radio" name="antecedentsDiabete" value="oui" required /> Oui</label>
      <label><input type="radio" name="antecedentsDiabete" value="non" required /> Non</label>

      <p>Avez-vous une routine d'exercice régulière ?</p>
      <label><input type="radio" name="routineExercice" value="oui" required /> Oui</label>
      <label><input type="radio" name="routineExercice" value="non" required /> Non</label>

      <p>Avez-vous des restrictions alimentaires spécifiques ?</p>
      <input type="text" value={restrictionsAlimentaires} onChange={e => setRestrictionsAlimentaires(e.target.value)} />

      <p>Avez-vous des antécédents de caillots sanguins ?</p>
      <label><input type="radio" name="antecedentsCaillots" value="oui" required /> Oui</label>
      <label><input type="radio" name="antecedentsCaillots" value="non" required /> Non</label>

      <p>Avez-vous des problèmes de sommeil ?</p>
      <label><input type="radio" name="problemesSommeil" value="oui" required /> Oui</label>
      <label><input type="radio" name="problemesSommeil" value="non" required /> Non</label>

      <p>Avez-vous des problèmes de stress ou d'anxiété ?</p>
      <label><input type="radio" name="stressAnxiete" value="oui" required /> Oui</label>
      <label><input type="radio" name="stressAnxiete" value="non" required /> Non</label>

      <p>Avez-vous des questions ou des préoccupations spécifiques ?</p>
      <input type="text" value={questionsPreoccupations} onChange={e => setQuestionsPreoccupations(e.target.value)} />

      <Link to="/resultats-cardiologue" className="button">Soumettre</Link>

      <Footer />
    </>
  );
};

export default Cardiologue;