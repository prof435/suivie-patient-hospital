// importation des composantes de chaque page
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Accueil from './views/accueil';
import connexion from './views/connexion';
import consultation from './views/consultation';
import rendezvous from './views/rendezvous';

function App() {
// configuration  des routes des differentes fonctionnalites
  return (
      <BrowserRouter>
        <Routes>
         <Route index  element={<Accueil/>}/>
          <Route path="/"  element={<Accueil/>}/>
          <Route index  element={<connexion/>}/>
          <Route path="/"  element={<connexion/>}/>
          <Route index  element={<consultation/>}/>
          <Route path="/"  element={<consultation/>}/>
          <Route index  element={<rendezvous/>}/>
          <Route path="/"  element={<rendezvous/>}/>
        </Routes>
      </BrowserRouter>
     );
}

export default App;
