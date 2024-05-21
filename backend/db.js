const { Sequelize, DataTypes, Model } = require('sequelize');

// Connexion à la base de données
const sequelize = new Sequelize('dimisante', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Modèle Utilisateur (parent de Médecin et Patient)
const Utilisateur = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Medecin', 'Patient'),
    allowNull: false
  },
  date_de_naissance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  date_heure_connexion: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
});

// Modèle Médecin (hérite de Utilisateur)
const Medecin = sequelize.define('Medecin', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  specialite: {
    type: DataTypes.STRING,
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dernier_diplome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Modèle Patient (hérite de Utilisateur)
const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  numero_de_telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  allergies: {
    type: DataTypes.TEXT,
    allowNull: true
  }, 
});

// Modèle Service
const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }, 
  prixConsultation : {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: 2500
  }

});

// Modèle Rendez-vous
const Rendez_vous = sequelize.define('Rendez_vous', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_heure: {
    type: DataTypes.DATE,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  etat: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

});

// Modèle Consultation
const Consultation = sequelize.define('Consultation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_heure: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  etat: {
    type: DataTypes.ENUM('Ouvert', 'Accepter','Fermer' ),
    allowNull: true,

  },
  paymentMethod: {
    type: DataTypes.ENUM('Mobile Money', 'Visa', ),
    allowNull: true,

  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    
  }
});


// Modèle Rapport de Consultation
const RapportConsultation = sequelize.define('RapportConsultation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Modèle Dossier Médical
const DossierMedical = sequelize.define('DossierMedical', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  resume: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Modèle ChatRoom
const ChatRoom = sequelize.define('ChatRoom', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Modèle Message
const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date_envoi: {
    type: DataTypes.DATE,
    allowNull: false
  }, 
  recu: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }, 
  lu:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

// Relations
Medecin.belongsTo(Service);
Service.hasMany(Medecin);

Consultation.belongsTo(Medecin);
Medecin.hasMany(Consultation);

Consultation.belongsTo(Patient);
Patient.hasMany(Consultation);

Consultation.hasOne(Rendez_vous);


Consultation.hasOne(RapportConsultation);
RapportConsultation.belongsTo(Consultation);

Patient.hasOne(DossierMedical);
DossierMedical.belongsTo(Patient);

Medecin.hasMany(ChatRoom);
ChatRoom.belongsTo(Medecin);

Patient.hasMany(ChatRoom);
ChatRoom.belongsTo(Patient);


ChatRoom.hasMany(Message);
Message.belongsTo(ChatRoom);

Message.belongsTo(Utilisateur);
Utilisateur.hasMany(Message);

Rendez_vous.belongsTo(Medecin);
Rendez_vous.belongsTo(Patient);

Medecin.belongsTo(Utilisateur);
Patient.belongsTo(Utilisateur);

Consultation.belongsTo(Service);

//Synchronisation des modèles avec la base de données
// sequelize.sync( {alter:false} )
//      .then(() => {
//        console.log('Modèles synchronisés avec la base de données');
//    })
//      .catch((err) => {
//       console.error('Erreur lors de la synchronisation des modèles:', err);
//     });

module.exports =  {sequelize, Utilisateur, Medecin, Patient, Service, ChatRoom, Consultation, Rendez_vous, RapportConsultation, Message, DossierMedical}
