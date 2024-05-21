import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBAr,TopNav  } from '../partials/header';
import Footer from '../partials/footer';

const Docteur = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('/api/patients')
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
    <TopNav/>
      <NavBAr/>
      
      <div className="Docteur" style={{ backgroundImage: "url('\img\nnn.jpg')" }}>
        <div className="container">
          <h1 className="titre">Consulter mon dossier médical</h1>

          <div className="information-patient">
            <h2>  <center>centerInformations personnelles  du patient</center></h2>
            {patients.length > 0 ? (
              <ul className="list-group">
                {patients.map((patient) => (
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
              <p>Aucun patient enregistre pour le moment </p>
            )}
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Docteur;