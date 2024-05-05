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
      <div className="consultation">
        <h1> Qu'elle expert aimerez rencontrer?</h1>

        <div className="specialist-links">
          <h2>Spécialistes en médecine</h2>
          <ul>
            <li>
              <Link to="/medecin-generaliste">MédecinGénéraliste</Link> {/* Lien vers la page du médecin généraliste */}
            </li>
            <li>
              <Link to="/dentiste">Dentiste</Link> {/* Lien vers la page du dentiste */}
            </li>
            <li>
              <Link to="/cardiologue">Cardiologue</Link> {/* Lien vers la page du cardiologue */}
            </li>
            <li>
              <Link to="/dermatologue">psychologue</Link> {/* Lien vers la page du dermatologue */}
            </li>
            <li>
              <Link to="/ophtalmologue">Ophtalmologue</Link> {/* Lien vers la page de l'ophtalmologue */}
            </li>
            <li>
              <Link to="/gynecologue">Gynécologue</Link> {/* Lien vers la page du gynécologue */}
            </li>
            <li>
              <Link to="/pediatre">Pédiatre</Link> {/* Lien vers la page du pédiatre */}
            </li>
            <li>
              <Link to="/psychiatre">Psychiatre</Link> {/* Lien vers la page du psychiatre */}
            </li>
            <li>
              <Link to="/orthopediste">Orthopédiste</Link> {/* Lien vers la page de l'orthopédiste */}
            </li>
            <li>
              <Link to="/gastro-enterologue">Gastro-entérologue</Link> {/* Lien vers la page du gastro-entérologue */}
            </li>
          </ul>
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