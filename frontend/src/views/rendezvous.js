import React, { useState, useEffect } from 'react';
import Header from '../partials/header';
import Footer from '../partials/footer';
import { Link } from 'react-router-dom';

const Docteur = () => {
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    // Récupérer les informations des patients depuis le backend Express.js
    fetch('/api/patients') // Appel à l'API du backend pour obtenir les informations des patients
      .then((response) => response.json()) // Conversion de la réponse en format JSON
      .then((data) => setPatients(data)) // Mise à jour de l'état des patients avec les données reçues
      .catch((error) => console.log(error)); // Gestion des erreurs
  }, []);

  const handleAccueilClick = () => {
    window.location.href = '/accueil'; // Redirection vers la page d'accueil
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Enregistrer les détails du rendez-vous
    setAppointmentDetails({
      date: selectedDate,
      doctor: selectedDoctor,
      // Ajoutez ici d'autres détails du rendez-vous provenant du formulaire
    });
    setConfirmation(true);
  };

  return (
    <>
      <Header />
      {/* <div className="Docteur" style={{ backgroundImage: "url('chemin_vers_votre_image')" }}>
        <div className="container">
          <h1 className="titre">Prenez un rendez-vous</h1>

          <div className="calendrier">
            <h2>Calendrier des rendez-vous</h2>
            <Calendar onDateSelect={handleDateSelect} />
          </div>

          <div className="selection-medecin">
            <h2>Sélection du médecin</h2>
            <DoctorList doctors={doctors} onDoctorSelect={handleDoctorSelect} />
          </div>

          <div className="formulaire-rendezvous">
            <h2>Formulaire de rendez-vous</h2>
            <AppointmentForm onSubmit={handleFormSubmit} />
          </div>

          {confirmation && (
            <div className="confirmation-rendezvous">
              <h2>Confirmation du rendez-vous</h2>
              <AppointmentConfirmation details={appointmentDetails} />
            </div>
          )}

          <div className="messages-notifications">
            <h2>Messages et notifications</h2>
            <AppointmentMessages />
          </div>

          <button className="btn btn-primary" onClick={handleAccueilClick}>
            Retour à l'accueil
          </button>
        </div>
      </div> */}
      <Footer />
    </>
  );
};

export default Docteur;