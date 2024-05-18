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
      date: new Date()
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
const   verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
      return res.status(401).json({ message: 'Token d\'authentification non trouvé !!' });
    }
    const test  = jwt.verify(token, 'votre_cle_secrete');
    if(!test){
      return res.status(402).json({ message: 'Token d\'authentification invalide ou expiré !!' });
    }
    const utilisateur = await Utilisateur.findByPk(test.userId);
    req.user = utilisateur;
    utilisateur.date_heure_connexion = Date.now();
    utilisateur.updatedAt = Date.now();
    await utilisateur.save();
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




//enregistrer un message
app.post('/chatrooms/:chatroomId/messages', verifyToken, async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const { contenu } = req.body;

    const chatroom = await ChatRoom.findByPk(chatroomId);
    if (!chatroom) {
      return res.status(404).json({ message: 'Chatroom non trouvé' });
    }

    const message = await Message.create({
      ChatRoomId: chatroomId,
      contenu,
      UtilisateurId: req.user.id,
      date_envoi:  new Date().
    });

    chatroom.updatedAt =  Date.now();
    await chatroom.save();

    res.status(201).json(message);
  } catch (err) {
    console.warn({ err });
    res.status(500).json({ message: 'Erreur lors de la création du message', error: err.message });
  }
});



app.get('/chatrooms/:chatRoomId', verifyToken, async (req, res) => {
  try {
    const chats =  await Message.findAll({where:{chatRoomId:req.params.chatRoomId}});
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




//liste
app.get('/chatrooms', verifyToken, async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'Medecin') {
      const patient = await Patient.findOne({ where: { UtilisateurId: user.id } });
      const chatrooms = await ChatRoom.findAll({
        where: { PatientId: patient.id },
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: Message,
            as: 'Messages',
            attributes: ['id', 'content', 'createdAt'],
            limit: 1,
            order: [['createdAt', 'DESC']],
          },
          {
            model: Medecin,
            as: 'Medecins',
            attributes: ['id'],
            include:[
              {
                model: Utilisateur,
                attributes: ['id', 'nom', 'prenom', 'email', 'role'],
                as: 'Utilisateurs'
              }
            ]
          },
        ],
      });
      return res.json(chatrooms);
    } else {
      const medecin = await Medecin.findOne({ where: { UtilisateurId: user.id } });
      const chatrooms = await ChatRoom.findAll({
        where: { MedecinId: medecin.id },
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: Message,
            as: 'Messages',
            attributes: ['id', 'contenu', 'createdAt', 'UtilisateurId'],
            limit: 1,
            order: [['createdAt', 'DESC']],
          },
          {
            model: Patient,
            as: 'Patient',
            attributes: ['id'],
            include:[
              {
                model: Utilisateur,
                attributes: ['id', 'nom', 'prenom', 'email', 'role'],
                as: 'Utilisateur'
              }
            ]
          },
        ],
      });
      return res.json(chatrooms);
    }
  } catch (err) {
    console.warn({ err });
    return res.status(500).json({ message: 'Erreur lors de la récupération des chatrooms', error: err });
  }
});





//mise à jour
app.post('/consultations/:consultationId/accept', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'Medecin') {
      return res.status(403).json({ message: 'Accès refusé. Non autorisé' });
    }

    const consultationId = req.params.consultationId;
    const consultation = await Consultation.findByPk(consultationId);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation non trouvée' });
    }
    const medecin = await Medecin.findOne({UtilisateurId: req.user.id});  
    if (!medecin) {
       return res.status(403).send({ message : 'Vous n\'avez pas acces à cette ressource (Medecin non trouvé)'})
    }
    consultation.etat = true; // Setting etat to true to mark it as accepted
    consultation.MedecinId = medecin.id;
    consultation.updatedAt = new Date();
    await consultation.save();
    const patient = await  Patient.findByPk(consultation.PatientId);
    const [chatroom, create] = await ChatRoom.findOrCreate({
      where: {
        MedecinId: medecin.id,
        PatientId: consultation.PatientId
      },
      defaults: {
        nom: "chat between " + req.user.nom + " and patient " + consultation.PatientId
      }
    });

    if (chatroom) {
      await Message.create({ChatRoomId: chatroom.id, contenu:consultation.title , UtilisateurId: patient.UtilisateurId, date_envoi: consultation.createdAt});
      await Message.create({ChatRoomId: chatroom.id, contenu:consultation.description, UtilisateurId: patient.UtilisateurId, date_envoi: consultation.createdAt});
      await Message.create({ChatRoomId: chatroom.id, contenu:"Merci je vous prends en charge.", UtilisateurId: medecin.UtilisateurId, date_envoi: new Date().toISOString()});
    }

    return res.status(200).json({ message: 'Consultation acceptée avec succès', consultation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//Creation 
app.post('/consultation', verifyToken, async (req, res) => {
  try {
    const { title, description, service, dontKnow } = req.body;
    const patient = await Patient.findOne({UtilisateurId: req.user.id});  
    if (!patient) {
      return res.status(403).send({ message : 'Vous n\'avez pas acces à cette ressource (patient non trouvé)'})
    }
    const consultation = await Consultation.create({
      date_heure: new Date(), // Utiliser la date et l'heure actuelles
      title,
      description,
      PatientId : patient.id,
      ServiceId: service    
    });

    return res.status(201).json(consultation);
  } catch (error) {
    return es.status(500).json({ error: error.message });
  }
});



//liste
app.get('/consultations', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'Medecin') {
      return res.status(403).json({ message: 'Accès refusé. Non autorisé' });
    }

    const medecin = await Medecin.findOne({UtilisateurId: req.user.id});  
    if (!medecin) {
      return res.status(403).send({ message : 'Vous n\'avez pas acces à cette ressource (Medecin non trouvé)'})
    }
    const consultations = await Consultation.findAll({
      where: { ServiceId: medecin.ServiceId, etat:false }, 
      order: [['date_heure', 'DESC']]
    });
    return res.json(consultations);
  } catch (err) {
    return res.status(500).json({ error: err.message });
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


app.get('/user', verifyToken, (req, res) => {
  try {
    const user =  req.user;
    res.status(200).json(user);
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
        UtilisateurId: utilisateur.id,
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
        UtilisateurId: utilisateur.id, // Utiliser l'ID de l'utilisateur créé
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
    user.date_heure_connexion = new Date();
    user.updatedAt = new Date();
    await user.save();
   
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

    await TokenBlacklist.create({ token: token });

    // Retourner une réponse de succès
    res.json({ message: 'Déconnexion réussie' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



