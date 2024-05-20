import React, { useState } from 'react';
import Footer from '../partials/footer';
import { NavBAr, TopNav } from '../partials/header';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const Rendez_vous = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentTimes, setAppointmentTimes] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!selectedDoctor || !selectedDate) {
      setFormErrors({ doctor: !selectedDoctor, date: !selectedDate });
      setSubmissionMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const selectedDateTime = selectedDate.format('YYYY-MM-DD HH:mm:ss');
    if (appointmentTimes[selectedDateTime]) {
      setSubmissionMessage("L'heure sélectionnée est déjà prise. Veuillez choisir une autre heure.");
    } else {
      setAppointmentTimes({ ...appointmentTimes, [selectedDateTime]: true });
      setSubmissionMessage("Vos informations ont été soumises. Un médecin vous contactera.");
    }
    setTimeout(() => {
      setSubmissionMessage('');
    }, 1000);
  };

  return (
    <>
      <TopNav />
      <NavBAr />

      <div className="container mt-5">
        <form onSubmit={handleFormSubmit}>
          <div className="row g-3 justify-content-center">
            <div className="col-md-4">
              <select className={`form-select ${formErrors.doctor && 'is-invalid'}`} onChange={(e) => handleDoctorSelect(e.target.value)} required>
                <option selected disabled>Choisissez un Médecin</option>
                <option value="Dentiste">Dr. Jean Dupont (Dentiste)</option>
                <option value="Cardiologue">Dr. Marie Leclerc (Cardiologue)</option>
                <option value="Gynécologue">Dr. François Lefevre (Gynécologue)</option>
                <option value="Ophtalmologue">Dr. Sophie Martin (Ophtalmologue)</option>
                <option value="Psychiatre">Dr. Paul Durand (Psychiatre)</option>
                <option value="Pédiatre">Dr. Laura Bernard (Pédiatre)</option>
              </select>
              {formErrors.doctor && <div className="invalid-feedback">Veuillez choisir un médecin.</div>}
            </div>
            <div className="col-md-4">
              <Datetime
                inputProps={{ placeholder: "Choisissez une Date", className: `form-control ${formErrors.date && 'is-invalid'}` }}
                onChange={handleDateSelect}
                dateFormat="YYYY-MM-DD HH:mm:ss"
                required
              />
              {formErrors.date && <div className="invalid-feedback">Veuillez choisir une date.</div>}
            </div>
            <div className="col-12 text-center mt-3">
              <button className="btn btn-primary" type="submit">Soumettre</button>
            </div>
            <div className="col-12 mt-3">
              {submissionMessage && <p>{submissionMessage}</p>}
            </div>
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-12">
          <img src="/img/rpng.png" alt="" style={{ width: "100%", height: "auto" }} />
        </div>
      </div>

  
    </>
  );
};

export default Rendez_vous;
