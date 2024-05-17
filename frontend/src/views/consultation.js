import React, { useState, useEffect } from 'react';
import Header from '../partials/header';
import Footer from '../partials/footer'; // fichier CSS pour le style

import axios from 'axios';

const Consultation = () => {
  const [services, setServices] = useState('');
  const [loaded, setLoaded] = useState(false);
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

  const getServices = async()=>{
    setAlert({
      show: false,
      message: '',
      variant: 'success'
    });
    const token = localStorage.getItem('authToken');
    await axios.get('http://localhost:5000/services', {
      headers: {
        'Authorization': `Bearer ${token}`
      
    }}).then((res)=>{
      setServices(res.data);
    })
    .catch((error)=>{
      if(error?.request?.status === 402){
        setAlert({
          show: true,
          message: ' Votre session a expiré, reconnectez-vous',
          variant: 'danger'
        });
        setTimeout(() => {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }, 10000);
      }else if(error?.request?.status === 403){
        setAlert({
          show: true,
          message: 'Patient non trouvé, veiller verifier votre identité en vous connectant !!',
          variant: 'danger'
        });
        setTimeout(() => {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }, 10000);
      }else{
        setAlert({
        show: true,
        message: ' Error: ' + error?.message,
        variant: 'danger'
      });
      console.warn(error);
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({
      show: false,
      message: '',
      variant: 'success'
    });
    const token = localStorage.getItem('authToken')
    const data = {...formData, token: token};
    try {
      const response = await axios.post('http://localhost:5000/consultation', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        
      }});
      
      setAlert({
        show: true,
        message: 'Demande de consultation soumise avec succès!',
        variant: 'success'
      });
    } catch (error) {
      console.warn(error);//"Cannot read properties of null (reading 'id')"
      setAlert({
        show: true,
        message: 'Erreur lors de la soumission de la demande de consultation.',
        variant: 'danger'
      });
    }
  };

  useEffect(()=>{
    if(!loaded){
      getServices();
      setLoaded(true);
    }
  }, [services]);

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
                    {services?.length > 0 && services?.map((service, index)=>(
                    <option key={index} value={service.id}>{service.nom}</option>

                    ))}
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