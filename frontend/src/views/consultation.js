import React, { useState } from 'react';
import Header from '../partials/header';
import Footer from '../partials/footer'; // fichier CSS pour le style

import axios from 'axios';

const Consultation = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: '',
    dontKnow: false
  });

  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/consultation', formData);
      setAlert({
        show: true,
        message: 'Demande de consultation soumise avec succès!',
        variant: 'success'
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Erreur lors de la soumission de la demande de consultation.',
        variant: 'danger'
      });
    }
  };


  return (
    <>
      <Header />
     
        

      <div className="container mt-5">
      {alert.show && (
        <div className={`alert alert-${alert.variant}`} role="alert">
          {alert.message}
        </div>
      )}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Formulaire de demande de consultation</h2>
        </div>
        <div className="card-body">
          <h3 className="mb-4">Comment vous sentez-vous aujourd'hui ?</h3>
          <form className='form-container' onSubmit={handleSubmit}>
            <div className='form-group mb-3'>
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                className='form-control'
                id="title"
                name="title"
                placeholder="Brève description"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor="description">Décrivez votre problème</label>
              <textarea
                className='form-control'
                id="description"
                name="description"
                placeholder="J'ai..."
                rows="4"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className='form-group mb-3'>
              <label>Quel service est le mieux adapté à vos besoins ?</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dontKnow"
                  name="dontKnow"
                  checked={formData.dontKnow}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="dontKnow">
                  Je ne sais pas
                </label>
              </div>
              <select
                className='form-select mt-2'
                name="service"
                value={formData.service}
                onChange={handleChange}
                disabled={formData.dontKnow}
              >
                <option value="">----------------</option>
                <option value="Médecine générale">Médecine générale</option>
                <option value="Ophtalmologie">Ophtalmologie</option>
                <option value="Dentisterie">Dentisterie</option>
                <option value="Psychologie">Psychologie</option>
                <option value="Pédiatrie">Pédiatrie</option>
              </select>
            </div>
            <div className='form-group'>
              <button type="submit" className='btn btn-info'>Soumettre</button>
            </div>
          </form>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default Consultation;