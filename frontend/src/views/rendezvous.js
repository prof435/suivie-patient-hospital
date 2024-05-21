import React, { useEffect, useState } from 'react';
import Footer from '../partials/footer';
import { NavBAr, TopNav } from '../partials/header';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import { Alert, Card, Col, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Rendez_vous = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [medecins, setMedecins] = useState(null);
  const [services, setServices] = useState(null);
  const [rendezvous, setRendezVous] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentTimes, setAppointmentTimes] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [user, setUser] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState({show:false, content: '', variant:'info'});
  const [selectedService, setSelectedService]  = useState(null);
  const [loaded, setLoaded] = useState(false);

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
    const authToken = localStorage.getItem('authToken');
    axios.post(`http://${window.location.hostname}:5000/rendezvous`, {medeciniId: selectedDoctor, dateheure: selectedDate}, { headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }}).then((res)=>{
      setAlert({show:true, variant:'success', content:res.data.message});
      setTimeout(() => {
      setAlert({show:false, content: '', variant:'info'});
      }, 2000);
    })
    .catch((err)=>{
      console.warn(err);
      setAlert({show:true, variant:'success', content: " Erreur :"  + err?.message})
    })
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


  


  const getMedecins = async(id) => {
    setAlert({
      show: false,
      message: '',
      variant: 'success'
    });
    const token = localStorage.getItem('authToken');
    await axios.get(`http://${window.location.hostname}:5000/medecins/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setMedecins(res.data);
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



  const getRendezVous = async() => {
    setAlert({
      show: false,
      message: '',
      variant: 'success'
    });
    const token = localStorage.getItem('authToken');
    await axios.get(`http://${window.location.hostname}:5000/rendezvous`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setRendezVous(res.data);
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
          message: 'Erreur lors de la recuperation des rendez-vous!!',
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
  useState(()=>{
    if (!loaded)  {
      getServices();
      getUser();
      getRendezVous();
      setLoaded(true);
    }

    
  }, []);




  return (
    <>
      <TopNav />
      <NavBAr />
      {user?.role === "Patient" ? (
        <>
            <div className="container mt-5">
              <form onSubmit={handleFormSubmit}>
                <div className="row g-3 justify-content-center">
                <div className="col-md-4">
                    <select  className={`form-select ${formErrors.doctor && 'is-invalid'}`} onChange={(e) => {setSelectedService(e.target.value); getMedecins(e.target.value)}} required>
                      <option selected disabled>Choisissez un service</option>
                      {services?.length > 0 && services.map((service)=>(
                      <option value={service.id} >{service.nom}</option>
                      ))}
                    </select>
                    {formErrors.doctor && <div className="invalid-feedback">Veuillez choisir un médecin.</div>}
                  </div>
                  <div className="col-md-4">
                    <select className={`form-select ${formErrors.doctor && 'is-invalid'}`} onChange={(e) => handleDoctorSelect(e.target.value)} required>
                      <option selected disabled>Choisissez un Médecin</option>
                      {medecins?.length > 0 && medecins.map((med)=>(
                      <option value={med.id} >{med.Utilisateur.nom + "  " + med.Utilisateur.prenom }</option>
                      ))}
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
              {alert.show && (
              <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                {alert.message}
                <p>{alert.content}</p>
              </Alert>
            )}
            </div>

            <div className="row">
              <div className="col-12">
                <img src="/img/rpng.png" alt="" style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </>
      ) : (
        <Container className='mt-4' >
          <h1 className="text-center mb-4">Liste des Consultations</h1>
          {alert.show && (
            <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
              {alert.message}
            </Alert>
          )}

          <div className="row">
            <div className="col-12">
              {rendezvous?.length > 0 ?  rendezvous.map((rdv)=>(
                <Card >
                  <p><span className='text-mutet'>  { new Date(rdv?.date_heure).toLocaleString()}</span>  <span className='ml-4'> {rdv?.Patient?.Utilisateur?.nom}</span></p>
                </Card>
              )):(
                <h3> Vous n'avec aucun rendez-vous programé pour l'instant, essayé plutot les <Link href='/consultion' >Consultations</Link></h3>
              )}
            </div>
          </div>
        </Container>
      )}

  
    </>
  );
};

export default Rendez_vous;
