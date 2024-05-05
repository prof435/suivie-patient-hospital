import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Accueil from './views/Accueil';
import Connexion from './views/connexion';
import Consultation from './views/consultation';
import RendezVous from './views/rendezvous';
import Inscription from './views/inscription'; 
import Docteur from './views/Docteur';
import MedecinGeneraliste from './views/MedecinGeneraliste';
//import Actualite from './views/actualite';

function App() {
  // configuration des routes des différentes fonctionnalités
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Accueil />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/Consultation" element={<Consultation />} />
        <Route path="/RendezVous" element={<RendezVous />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/MedecinGeneraliste" element={<MedecinGeneraliste/>} />
  {/*       <Route path="/Actualite" element={<Actualite />} />*/}
        <Route path="/Docteur" element={<Docteur />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;