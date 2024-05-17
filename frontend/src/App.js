import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Accueil from './views/accueil';
import Connexion from './views/connexion';
import Consultation from './views/consultation';
import RendezVous from './views/rendezvous';
import Inscription from './views/inscription'; 
import Docteur from './views/Docteur';
import MedHome from './views/medecinHome';
import PageNotFound from './views/PageNotFound';
import RapportMedical from './views/rapportmedical';
import Conseils from './views/conseils';
import PayementPage from './views/payementpage';
import ChatRoom from './views/chat';
//import Actualite from './views/actualite';

function App() {
  // configuration des routes des différentes fonctionnalités
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Accueil />} />
        ///<Route path="/Accueil" element={<Accueil />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/Consultation" element={<Consultation />} />
        <Route path="/RendezVous" element={<RendezVous />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/MedHome" element={<MedHome/>} />
  {/*       <Route path="/Actualite" element={<Actualite />} />*/}
        <Route path="/Docteur" element={<Docteur />} />
        <Route path="/Chat" element={<ChatRoom />} />
        <Route path="/rapportmedical" element={<RapportMedical />} />
        <Route path="/conseils" element={<Conseils />} />
        <Route path="/payementpage " element={<PayementPage />} />
        {/* <Route path='*' element={<PageNotFound />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;