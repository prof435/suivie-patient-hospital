const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const {sequelize, Utilisateur, Medecin, Patient, Service, ChatRoom, Consultation, Rendez_vous, RapportConsultation, Message, DossierMedical} = require('./db');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      contentType: req.headers['content-type'],
      date: new Date().toISOString()
    };
    console.log(log);
  });
  next();
});


const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'origine que vous souhaitez autoriser
  optionsSuccessStatus: 200 // Pour les navigateurs plus anciens (IE11, diverses versions SmartTVs) qui n'acceptent pas les 204 comme réponse
};

app.use(cors(corsOptions)); 

app.listen(5000, () => {
  console.log('Serveur démarré sur le port 3000');
});





// Middleware pour vérifier le token d'authentification
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
      return res.status(401).json({ message: 'Token d\'authentification non trouvé !!' });
    }
    const test  = jwt.verify(token, 'votre_cle_secrete');
    console.info(test);
    if(!test){
      return res.status(402).json({ message: 'Token d\'authentification invalide ou expiré !!' });
    }
    const utilisateur = await Utilisateur.findByPk(test.userId);
    req.user = utilisateur;
    next();
  } catch (err) {
    if( err?.name  == 'TokenExpiredError'){
      return res.status(403).json({ message: 'Token expiré' });
    }else{
    console.warn({err});
    return res.status(401).json({ message: 'Token d\'authentification invalide' });
    }
  }
};

app.post('/consultation', verifyToken, async (req, res) => {
  try {
    const { title, description, service, dontKnow } = req.body;
    const patient = Patient.findOne({utilisateurId: req.user.id});
    if (!patient) {
      res.status(403).send({ message : 'Vous n\'avez pas acces à cette ressource (patient non trouvé)'})
    }
    const consultation = await Consultation.create({
      date_heure: new Date(), // Utiliser la date et l'heure actuelles
      title,
      description,
      PatientId : patient.id
    });

    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




app.get('/services', verifyToken, async (req, res) => {
  try {
    const services = await Service.findAll();

    res.status(201).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







// Création de compte utilisateur
app.post('/register', async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, role, date_de_naissance, numero_de_telephone } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await Utilisateur.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Créer l'utilisateur
    const utilisateur = await Utilisateur.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      role,
      date_de_naissance
    });

    // Créer soit un médecin, soit un patient
    let userDetail;
    if (role === 'Medecin') {
      const serviceGeneral = await Service.findOne({ where: { nom: 'Médecine générale' } });
      await Medecin.create({
        id: utilisateur.id,
        nom,
        prenom,
        email,
        mot_de_passe: hashedPassword,
        role,
        date_de_naissance,
        ServiceId: serviceGeneral.id, // Associer le service de Médecine générale
        grade: 'inconnu',
        dernier_diplome : 'inconnu',
        specialite : 'inconnu',
      
      });
    } else if (role === 'Patient') {
      userDetail = await Patient.create({
        id: utilisateur.id, // Utiliser l'ID de l'utilisateur créé
        numero_de_telephone
      });
    }

    res.status(201).json({ utilisateur, userDetail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// Connexion
app.post('/login', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Trouver l'utilisateur par email
    const user = await Utilisateur.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, 'votre_cle_secrete', { expiresIn: '20h' });
    user.update({date_heure_connexion: new Date()});
    user.save();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// Mise à jour des informations utilisateur
app.put('/users/:id', verifyToken, async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, date_de_naissance } = req.body;

    // Vérifier que l'utilisateur demandé correspond à l'utilisateur authentifié
    if (req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({ error: 'Vous n\'avez pas l\'autorisation de modifier ces informations' });
    }

    // Mettre à jour les informations
    req.user.nom = nom;
    req.user.prenom = prenom;
    req.user.email = email;
    req.user.date_de_naissance = date_de_naissance;

    // Mettre à jour le mot de passe si fourni
    if (mot_de_passe) {
      req.user.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);
    }

    await req.user.save();

    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ...


// Endpoint de déconnexion
app.post('/logout', async(req, res) => {
  try {
    // Récupérer le token d'authentification depuis l'en-tête Authorization
    const token = req.headers.authorization.split(' ')[1];

    // Vérifier la validité du token
    const decoded = jwt.verify(token, 'votre_cle_secrete');

    // Supprimer le token côté serveur (optionnel)
    // Cela empêche l'utilisation du même token pour une nouvelle connexion
    await TokenBlacklist.create({ token: token });

    // Retourner une réponse de succès
    res.json({ message: 'Déconnexion réussie' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.post('/api/consultation', async (req, res) => {
  const { date_heure, patient_id, medecin_id, description, rendez_vous_id, etat } = req.body;
  
  try {
    const consultation = await Consultation.create({
      date_heure,
      patient_id,
      medecin_id,
      description,
      rendez_vous_id,
      etat
    });
    res.status(201).json(consultation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
