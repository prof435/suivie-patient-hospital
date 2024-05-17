import React from "react";
import { Link } from "react-router-dom";
import { NavBAr } from '../partials/header';
import Footer  from '../partials/footer';

let patients = [];

// .. ... // liste de patients

const RapportMedical = ({ patients }) => {
  return (
    <>
      <NavBAr />

      <div className="container-fluid">
        <h1 className="text-center">Rapport Médical</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Age</th>
              <th>Sexe</th>
              <th>Antécédents</th>
              <th>Allergies</th>
              <th>Traitement</th>
              <th>Motif de consultation</th>
              <th>Examen clinique</th>
              <th>Examens complémentaires</th>
              <th>Diagnostic</th>
              <th>Traitement prescrit</th>
              <th>Évolution</th>
              <th>Conclusion</th>
              <th>Dernière visite</th>
              <th>Prochain rendez-vous</th>
              <th>Conseille</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.nom}</td>
                <td>{patient.prenom}</td>
                <td>{patient.age}</td>
                <td>{patient.sexe}</td>
                <td>{patient.antecedents}</td>
                <td>{patient.allergies}</td>
                <td>{patient.traitement}</td>
                <td>{patient.motifConsultation}</td>
                <td>{patient.examenClinique}</td>
                <td>{patient.examensComplementaires}</td>
                <td>{patient.diagnostic}</td>
                <td>{patient.traitement2}</td>
                <td>{patient.evolution}</td>
                <td>{patient.conclusion}</td>
                <td>{patient.derniereVisite}</td>
                <td><Link to={`/patients/${patient.id}`}>Voir plus</Link></td>
                <td><Link to={`/conseille/${patient.id}`}>Conseille</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default RapportMedical;