import React, { useState, useEffect } from 'react';
import {Card, Button, Container, Alert, Modal, Spinner  } from 'react-bootstrap';
import Footer from '../partials/footer';
import axios from 'axios';
import { NavBAr } from '../partials/header';

const Consultation = () => {
  const [services, setServices] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: '',
    dontKnow: false,
    paymentMethod: '',
    mobileNumber: '',
    cardNumber: '',
    acceptDeduction: false
  });

  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });  
  const [consultations, setConsultations] = useState([]);
  const [expandedConsultation, setExpandedConsultation] = useState(null);
  const [user, setUser] = useState(null);
  const [servicePrice, setServicePrice] = useState(0);


  const [showModal, setShowModal] = useState(false);
  const [consultationId, setConsultationId] = useState(null);

  const getUser = async() => {
    setUser(null);
    const authToken = localStorage.getItem('authToken');
    await axios.get(`http://${window.location.hostname}:5000/user`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type' : 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
      } else {
        alert("Une erreur s'est produite !!");
      }
    }).catch((err)=>{
      if(err?.code === 'ERR_BAD_REQUEST') {
        window.location.href = "/login";
      }
      console.warn(err);
    });
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    setFormData({
      ...formData,
      service: selectedService
    });
    const service = services.find(s => s.id === selectedService);
    setServicePrice(service ? service.prixConsultation : 0);
  };

  const getServices = async() => {
    setAlert({
      show: false,
      message: '',
      variant: 'success'
    });
    const token = localStorage.getItem('authToken');
    await axios.get(`http://${window.location.hostname}:5000/services`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setServices(res.data);
    })
    .catch((error) => {
      if (error?.request?.status === 402) {
        setAlert({
          show: true,
          message: 'Votre session a expiré, reconnectez-vous',
          variant: 'danger'
        });
        setTimeout(() => {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }, 10000);
      } else if (error?.request?.status === 403) {
        setAlert({
          show: true,
          message: 'Patient non trouvé, veuillez vérifier votre identité en vous connectant !!',
          variant: 'danger'
        });
        setTimeout(() => {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }, 10000);
      } else {
        setAlert({
          show: true,
          message: 'Error: ' + error?.message,
          variant: 'danger'
        });
        console.warn(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptDeduction) {
      setAlert({
        show: true,
        message: 'Vous devez accepter le prélèvement pour soumettre la demande.',
        variant: 'danger'
      });
      return;
    }
    setAlert({
      show: false,
      message: '',
      variant: 'success'
    });
    const token = localStorage.getItem('authToken');
    const medGeneral = services.filter((service) => service.nom === "Médecine générale");
    const data = { ...formData, token: token, service: formData.dontKnow ? [...medGeneral][0].id : formData.service };
    try {
      const response = await axios.post(`http://${window.location.hostname}:5000/consultation`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setAlert({
        show: true,
        message: 'Demande de consultation soumise avec succès!',
        variant: 'success'
      });

      setConsultationId(response.data.id);
      setTimeout(() => {
        setShowModal(true);
        setAlert({
          show: false,
          message: '',
          variant: 'success'
        });
      }, 2000);

    } catch (error) {
      console.warn(error);
      setAlert({
        show: true,
        message: 'Erreur lors de la soumission de la demande de consultation.',
        variant: 'danger'
      });
    }
  };

  const checkConsultationStatus = async (consultationId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`http://${window.location.hostname}:5000/consultations/${consultationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.etat === 'Accepter') {
        window.location.href = '/chat';
      }
    } catch (error) {
      console.warn(error);
    }
  };


  const handleAccept = async (consultationId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const res = await axios.post(`http://${window.location.hostname}:5000/consultations/${consultationId}/accept`, {}, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type' : 'application/json' }
      });
      console.log(res);
      setAlert({ show: true, message: 'Consultation acceptée avec succès!', variant: 'success' });
      
      setTimeout(() => {
        window.location.href = '/chat';
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de la consultation :', error);
      setAlert({ show: true, message: 'Erreur lors de l\'acceptation de la consultation.', variant: 'danger' });
    }
  };

  const handleExpand = (consultationId) => {
    setExpandedConsultation(expandedConsultation === consultationId ? null : consultationId);
  };

  useEffect(() => {
    if (!loaded) {
      getServices();
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        getUser();
        setLoaded(true);
        const fetchConsultations = async () => {
          try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.get(`http://${window.location.hostname}:5000/consultations`, {
              headers: { Authorization: `Bearer ${authToken}`, 'Content-Type' : 'application/json' }
            });
            setConsultations(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération des consultations :', error);
          }
        };
        fetchConsultations();
      } else {
        window.location.href = '/login';
      }
    }
  }, [services, consultations, getUser, loaded]);


  useEffect(() => {
    if (showModal && consultationId) {
      const interval = setInterval(() => {
        checkConsultationStatus(consultationId);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showModal, consultationId]);


  return (
    <>
      <NavBAr />
      {user?.role === "Patient" ? (
        <div className="container mt-5">
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Bienvenue dans la page de consultation</h2>
            </div>
            <div className="card-body">
              <h3 className="mb-4">Comment est-ce que nous pouvons vous aider?</h3>
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
                    onChange={  handleServiceChange}
                    disabled={formData.dontKnow}
                  >
                    <option value="">----------------</option>
                    {services?.length > 0 && services.map((service, index) => (
                      <option key={index} value={service.id}>{service.nom}</option>
                    ))}
                  </select>
                </div>
                <div className='form-group mb-3'>
                  <label htmlFor="servicePrice">Montant à prélever</label>
                  <input
                    type="text"
                    className='form-control'
                    id="servicePrice"
                    name="servicePrice"
                    value={servicePrice}
                    readOnly
                  />
                </div>
                <h3 className="mb-4">Informations de paiement</h3>
                <div className='form-group mb-3'>
                  <label>Méthode de paiement</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="mobileMoney"
                      name="paymentMethod"
                      value="Mobile Money"
                      checked={formData.paymentMethod === "Mobile Money"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="mobileMoney">
                      <img src="img/mobile-money.jpeg" alt="Mobile Money" style={{ width: '50px', marginRight: '10px' }} />
                      Mobile Money
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="visa"
                      name="paymentMethod"
                      value="Visa"
                      checked={formData.paymentMethod === "Visa"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="visa">
                      <img src="img/visa.png" alt="Visa" style={{ width: '50px', marginRight: '10px' }} />
                      Visa
                    </label>
                  </div>
                </div>
                {formData.paymentMethod === "Mobile Money" && (
                  <div className='form-group mb-3'>
                    <label htmlFor="mobileNumber">Numéro Mobile Money</label>
                    <input
                      type="text"
                      className='form-control'
                      id="mobileNumber"
                      name="mobileNumber"
                      placeholder="6 _ _   _ _ _   _ _ _"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {formData.paymentMethod === "Visa" && (
                  <div className='form-group mb-3'>
                    <label htmlFor="cardNumber">Numéro de Carte Visa</label>
                    <input
                      type="text"
                      className='form-control'
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="_ _ _ _   _ _ _ _   _ _ _ _  _ _ _ _ "
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className='form-check mb-3'>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceptDeduction"
                    name="acceptDeduction"
                    checked={formData.acceptDeduction}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="acceptDeduction">
                    J'accepte le prélèvement du montant indiqué sur mon compte
                  </label>
                </div>

                {alert.show && (
              <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                  {alert.message}
              </Alert>
          )}
                <div className='form-group'>
                  <button type="submit" className='btn btn-info'>Soumettre</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Container className="mt-4">
          <h1 className="text-center mb-4">Liste des Consultations</h1>
          {alert.show && (
            <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
              {alert.message}
            </Alert>
          )}
          {consultations.map((consultation, index) => (
            <Card className={`mb-4 ${index % 2 === 0 ? 'bg-light' : ' text-white'}`} key={consultation.id}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5>{consultation.title}</h5>
                <Button variant="success" onClick={() => handleAccept(consultation.id)}>Accepter</Button>
              </Card.Header>
              <Card.Body>
                <p>
                  {expandedConsultation === consultation.id
                    ? consultation.description
                    : `${consultation.description.substring(0, 100)}...`}
                </p>
                <Button variant="link" onClick={() => handleExpand(consultation.id)}>
                  {expandedConsultation === consultation.id ? 'Voir moins' : 'Voir plus'}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3">Veuillez patienter, nous vérifions l'état de votre consultation...</p>
        </Modal.Body>
      </Modal>
      <Footer />
    </>
  );
};

export default Consultation;
