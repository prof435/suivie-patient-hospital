
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

// Modèle pour Patient
const Patient = sequelize.define('Patient', {
  ID_Patient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nom: DataTypes.STRING,
  Prénom: DataTypes.STRING,
  Date_Naissance: DataTypes.DATE,
  Sexe: DataTypes.STRING,
  Taille: DataTypes.FLOAT,
  Couleur_Peau: DataTypes.STRING,
  Lieu_habitation: DataTypes.STRING,
  Allergies: DataTypes.STRING,
  Couleur_Cheveux: DataTypes.STRING,
  Photo_Profil: DataTypes.STRING,
  Autres_Informations_Médicales: DataTypes.TEXT
});

// Modèle pour Médecin
const Medecin = sequelize.define('Medecin', {
  ID_Médecin: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nom: DataTypes.STRING,
  Prénom: DataTypes.STRING,
  Spécialité: DataTypes.STRING,
  Disponibilité: DataTypes.BOOLEAN,
  Grade: DataTypes.STRING,
  Autres_Informations_Médicales: DataTypes.TEXT
});

// Modèle pour Service
const Service = sequelize.define('Service', {
  ID_Service: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nom_Service: DataTypes.STRING,
  Description: DataTypes.TEXT
});

// Modèle pour Rendez-vous
const RendezVous = sequelize.define('RendezVous', {
  ID_Rendez-vous: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_Patient: DataTypes.INTEGER,
  ID_Médecin: DataTypes.INTEGER,
  ID_Service: DataTypes.INTEGER,
  Date_Heure: DataTypes.DATE,
  Type_Rendez-vous: DataTypes.STRING,
  État_Rendez-vous: DataTypes.STRING,
  Remarques: DataTypes.TEXT
});

// Modèle pour Consultation
const Consultation = sequelize.define('Consultation', {
  ID_Consultation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_RDV: DataTypes.INTEGER,
  Date_Heure_Début: DataTypes.DATE,
  Date_Heure_Fin: DataTypes.DATE,
  État_Consultation: DataTypes.STRING,
  Id_ChatRoom: DataTypes.INTEGER
});

// Modèle pour Rapport_Consultation
const RapportConsultation = sequelize.define('RapportConsultation', {
  ID_Rapport: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ID_Consultation: DataTypes.INTEGER,
  ID_Medecin: DataTypes.INTEGER,
  Contenu_Message: DataTypes.TEXT,
  Date_Heure: DataTypes.DATE
});

// Modèle pour ChatRoom
const ChatRoom = sequelize.define('ChatRoom', {
  ID_ChatRoom: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nom_ChatRoom: DataTypes.STRING,
  Description_ChatRoom: DataTypes.TEXT,
  Id_User_1: DataTypes.INTEGER,
  Id_User_2: DataTypes.INTEGER,
  date_creation: DataTypes.DATE
});

// Modèle pour Message
const Message = sequelize.define('Message', {
  From: DataTypes.INTEGER,
  Id_chatroom: DataTypes.INTEGER,
  data_send: DataTypes.DATE,
  date_received: DataTypes.DATE,
  date_readed: DataTypes.DATE
});

// Définir les relations entre les modèles

// Patient - RendezVous
Patient.hasMany(RendezVous, { foreignKey: 'ID_Patient' });
RendezVous.belongsTo(Patient, { foreignKey: 'ID_Patient' });

// Médecin - RendezVous
Medecin.hasMany(RendezVous, { foreignKey: 'ID_Médecin' });
RendezVous.belongsTo(Medecin, { foreignKey: 'ID_Médecin' });

// Service - RendezVous
Service.hasMany(RendezVous, { foreignKey: 'ID_Service' });
RendezVous.belongsTo(Service, { foreignKey: 'ID_Service' });

// RendezVous - Consultation
RendezVous.hasOne(Consultation, { foreignKey: 'ID_RDV' });
Consultation.belongsTo(RendezVous, { foreignKey: 'ID_RDV' });

// Consultation - RapportConsultation
Consultation.hasMany(RapportConsultation, { foreignKey: 'ID_Consultation' });
RapportConsultation.belongsTo(Consultation, { foreignKey: 'ID_Consultation' });

// Consultation - ChatRoom
Consultation.belongsTo(ChatRoom, { foreignKey: 'Id_ChatRoom' });
ChatRoom.hasMany(Consultation, { foreignKey: 'Id_ChatRoom' });

// ChatRoom - Message
ChatRoom.hasMany(Message, { foreignKey: 'Id_chatroom' });
Message.belongsTo(ChatRoom, { foreignKey: 'Id_chatroom' });

// Synchroniser les modèles avec la base de données
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de données synchronisée');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation de la base de données :', err);
  });