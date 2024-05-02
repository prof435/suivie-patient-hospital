const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'votre_utilisateur_mysql',
  password: 'votre_mot_de_passe_mysql',
  database: 'suivi_patients'
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Définition des routes

// Route pour récupérer tous les patients
app.get('/patients', (req, res) => {
  connection.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des patients :', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});

// Route pour créer un nouveau patient
app.post('/patients', (req, res) => {
  const { nom, prenom, dateNaissance } = req.body;
  const patient = { nom, prenom, date_naissance: dateNaissance };

  connection.query('INSERT INTO patients SET ?', patient, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création du patient :', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(201).json({ id: result.insertId, ...patient });
    }
  });
});

// Route pour récupérer toutes les consultations
app.get('/consultations', (req, res) => {
  connection.query('SELECT * FROM consultations', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des consultations :', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});

// Route pour créer une nouvelle consultation
app.post('/consultations', (req, res) => {
  const { patientId, date, commentaire } = req.body;
  const consultation = { patient_id: patientId, date, commentaire };

  connection.query('INSERT INTO consultations SET ?', consultation, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de la consultation :', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(201).json({ id: result.insertId, ...consultation });
    }
  });
});

// Route pour récupérer tous les utilisateurs
app.get('/utilisateurs', (req, res) => {
  connection.query('SELECT * FROM utilisateurs', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});

// Route pour créer un nouvel utilisateur
app.post('/utilisateurs', (req, res) => {
  const { nom, email, motDePasse } = req.body;
  const utilisateur = { nom, email, mot_de_passe: motDePasse };

  connection.query('INSERT INTO utilisateurs SET ?', utilisateur, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de l\'utilisateur :', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(201).json({ id: result.insertId, ...utilisateur });
    }
  });
});

// Route pour récupérer tous les rendezvous
app.get('/rendezvous', (req, res) => {
  connection.query('SELECT * FROM rendezvous', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des rendezvous :', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});

// Route pour créer un nouveau rendezvous
app.post('/rendezvous', (req, res) => {
  const { patientId, date, heure } = req.body;
  const rendezvous = { patient_id: patientId, date, heure };

  connection.query('INSERT INTO rendezvous SET ?', rendezvous, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création du rendezvous :', err);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(201).json({ id: result.insertId, ...rendezvous });
    }
  });
});

// Écoute du serveur
app.listen(3000, () => {
  console.log('Serveur Express en cours d\'exécution sur le port 3000');
});




//Ce code est un exemple d'une application Express utilisant MySQL comme base de données pour gérer le suivi des patients, les consultations, les utilisateurs et les rendez-vous. Voici une explication simplifiée du code :

//Tout d'abord, les modules express et mysql sont importés.

//Une instance de l'application Express est créée en appelant express() et stockée dans la variable app.

//Ensuite, une connexion à la base de données MySQL est configurée en utilisant les informations de connexion appropriées (hôte, utilisateur, mot de passe, base de données).

//La méthode connect() est appelée sur l'objet de connexion pour établir la connexion à la base de données. Si une erreur se produit, le message d'erreur est affiché dans la console. Sinon, un message indiquant que la connexion a réussi est affiché.

//Ensuite, les routes sont définies pour différentes fonctionnalités :La route /patients est configurée pour récupérer tous les patients de la base de données et les renvoyer en tant que réponse JSON.

//La route /patients avec la méthode POST est configurée pour créer un nouveau patient en insérant les données fournies dans la base de données. Les données du patient sont extraites de req.body et insérées dans la table patients. Si une erreur se produit, un message d'erreur est renvoyé en tant que réponse, sinon l'ID du patient nouvellement créé et les données du patient sont renvoyés en tant que réponse JSON avec le statut 201.

//Des routes similaires sont configurées pour les consultations, les utilisateurs et les rendez-vous, permettant de récupérer tous les éléments et d'en créer de nouveaux.

//Enfin, le serveur Express écoute sur le port 3000 et affiche un message dans la console pour indiquer que le serveur est en cours d'exécution.



