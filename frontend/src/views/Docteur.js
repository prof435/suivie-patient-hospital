import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/header';
import Footer from '../partials/footer';
//import './Docteur.css'; // Import du fichier CSS personnalisé
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import du fichier CSS Bootstrap

const Docteur = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Récupérer les informations des patients depuis le backend Express.js
    fetch('/api/patients') // Appel à l'API du backend pour obtenir les informations des patients
      .then((response) => response.json()) // Conversion de la réponse en format JSON
      .then((data) => setPatients(data)) // Mise à jour de l'état des patients avec les données reçues
      .catch((error) => console.log(error)); // Gestion des erreurs
  }, []);

  return (
    <>
        <Header/>
    <div className="Docteur" style={{ backgroundImage: "url('chemin_vers_votre_image')" }}>
      <div className="container">
        <h1 className="titre">Consulter un dossier médical</h1>

        <div className="information-patient">
          <h2>Informations du patient</h2>
          {patients.length > 0?( // Vérification s'il y a des patients enregistrés
            <ul className="list-group">
              {patients.map((patient) => ( // Boucle pour afficher les informations de chaque patient
                <li key={patient.id} className="list-group-item">
                  <p>
                    <strong>Nom:</strong> {patient.nom}
                  </p>
                  <p>
                    <strong>Prénom:</strong> {patient.prenom}
                  </p>
                  <p>
                    <strong>Adresse:</strong> {patient.adresse}
                  </p>
                  <p>
                    <strong>Email:</strong> {patient.email}
                  </p>
                  <p>
                    <strong>Sexe:</strong> {patient.sexe}
                  </p>
                  <p>
                    <strong>Date:</strong> {patient.date}
                  </p>
                  <p>
                    <strong>Heure:</strong> {patient.heure}
                  </p>
                  <p>
                    <strong>Service sollicité:</strong> {patient.service}
                  </p>
                  <Link to={`/bilan/${patient.id}`} className="btn btn-primary">
                    Bilan de santé
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun patient enregistré</p>
          )}
        </div>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default Docteur ;