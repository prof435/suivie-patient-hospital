import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/header';
import Footer from '../partials/footer';
import './consultation.css';

const Psychologue = () => {
  const [forteAnxiete, setForteAnxiete] = useState('');
  const [penseesSuicidaires, setPenseesSuicidaires] = useState('');
  const [problemesSommeil, setProblemesSommeil] = useState('');
  const [difficultesConcentration, setDifficultesConcentration] = useState('');
  const [sautesHumeur, setSautesHumeur] = useState('');
  const [grandeTristesse, setGrandeTristesse] = useState('');
  const [traumatismeAbus, setTraumatismeAbus] = useState('');
  const [dependance, setDependance] = useState('');
  const [problemesRelation, setProblemesRelation] = useState('');
  const [penseesObsessionnelles, setPenseesObsessionnelles] = useState('');

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

      <h2>Questions psychologiques</h2>

      <p>Avez-vous déjà ressenti une forte anxiété ou une panique intense ?</p>
      <label><input type="radio" name="forteAnxiete" value="oui" required /> Oui</label>
      <label><input type="radio" name="forteAnxiete" value="non" required /> Non</label>

      <p>Avez-vous déjà eu des pensées suicidaires ?</p>
      <label><input type="radio" name="penseesSuicidaires" value="oui" required /> Oui</label>
      <label><input type="radio" name="penseesSuicidaires" value="non" required /> Non</label>

      <p>Avez-vous déjà eu des problèmes de sommeil fréquents ?</p>
      <label><input type="radio" name="problemesSommeil" value="oui" required /> Oui</label>
      <label><input type="radio" name="problemesSommeil" value="non" required /> Non</label>

      <p>Avez-vous déjà éprouvé des difficultés à vous concentrer ou à vous souvenir des choses ?</p>
      <label><input type="radio" name="difficultesConcentration" value="oui" required /> Oui</label>
      <label><input type="radio" name="difficultesConcentration" value="non" required /> Non</label>

      <p>Avez-vous déjà fait l'expérience de sautes d'humeur importantes ?</p>
      <label><input type="radio" name="sautesHumeur" value="oui" required /> Oui</label>
      <label><input type="radio" name="sautesHumeur" value="non" required /> Non</label>

      <p>Avez-vous déjà ressenti une grande tristesse ou un sentiment de vide prolongé ?</p>
      <label><input type="radio" name="grandeTristesse" value="oui" required /> Oui</label>
      <label><input type="radio" name="grandeTristesse" value="non" required /> Non</label>

      <p>Avez-vous déjà été victime d'un traumatisme ou d'un abus ?</p>
      <label><input type="radio" name="traumatismeAbus" value="oui" required /> Oui</label>
      <label><input type="radio" name="traumatismeAbus" value="non" required /> Non</label>

      <p>Avez-vous déjà eu des problèmes de dépendance à l'alcool, aux drogues ou au jeu ?</p>
      <label><input type="radio" name="dependance" value="oui" required /> Oui</label>
      <label><input type="radio" name="dependance" value="non" required /> Non</label>

      <p>Avez-vous déjà rencontré des problèmes dans vos relations personnelles ou professionnelles ?</p>
      <label><input type="radio" name="problemesRelation" value="oui" required /> Oui</label>
      <label><input type="radio" name="problemesRelation" value="non" required /> Non</label>

      <p>Avez-vous déjà eu des pensées obsessionnelles ou des comportements compulsifs ?</p>
      <label><input type="radio" name="penseesObsessionnelles" value="oui" required /> Oui</label>
      <label><input type="radio" name="penseesObsessionnelles" value="non" required /> Non</label>
      <button>Valider</button>
      <Link to="/resultats">
        
      </Link>

      <Footer />
    </>
  );
};

export default Psychologue;