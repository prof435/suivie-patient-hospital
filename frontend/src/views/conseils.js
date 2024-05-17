import React from "react";
import { NavBAr ,TopNav } from '../partials/header';
import {Link} from 'react-router-dom';
const Conseils = ({ patient }) => {
  return (
    <>
     <NavBAr/>
       <TopNav/>
      <div className="container">
        <h1 className="text-center">Conseille {patient.nom} {patient.prenom}</h1>
        <p className="text-justify">Bonjour {patient.nom} {patient.prenom}, je suis heureux de vous avoir vu aujourd'hui. Voici quelques conseils que j'ai pour vous :</p>

        <h2>Conseils médicaux</h2>
        <ul>
          <li>Il est important de suivre votre traitement médicamenteux comme indiqué, afin d'empêcher les récurrences de votre maladie.</li>
          <li>Il est recommandé de vous faire régulièrement des tests de dépistage pour surveiller l'évolution de votre santé.</li>
          <li>Il est important de prendre soin de votre santé mentale en pratiquant des activités relaxantes et en vous assurant de recevoir suffisamment de sommeil.</li>
          <li>Il est important de vous faire accompagner d'un membre de votre famille ou d'un ami lors des visites médicales pour vous aider à vous sentir plus à l'aise.</li>
          <li>Il est important de demander des explications claires à vos médecins et à vos infirmiers sur vos soins médicaux pour ne pas avoir d'inquiétude inutile.</li>
        </ul>

        <p className="text-justify">N'hésitez pas à me contacter si vous avez des questions ou des préoccupations concernant votre santé. Je suis toujours là pour vous aider.</p>

        <Link to={`/`}>Retour à la page d'accueil</Link>
      </div>
    </>
  );
};

export default Conseils;