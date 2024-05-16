const { Sequelize, DataTypes } = require('sequelize');

// Connexion à la base de données
const sequelize = new Sequelize('dmisante', 'root', '', {
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
}, {
  // Héritage de Utilisateur
  inherits: Utilisateur
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
  }
}, {
  // Héritage de Utilisateur
  inherits: Utilisateur
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
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: 'id'
      }
    },
    medecin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medecin,
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'rendez_vous',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  // Modèle Consultation
  const Consultation = sequelize.define('Consultation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date_heure: {
      type: DataTypes.DATE,
      allowNull: false
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: 'id'
      }
    },
    medecin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medecin,
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rendez_vous_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Rendez_vous,
        key: 'id'
      },
    etat : {
        type: DataTypes.Boolean,
        default : false

    }
    }
  }, {
    tableName: 'consultations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
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
  }
});

// Relations
Medecin.belongsTo(Service);
Service.hasMany(Medecin);

Consultation.belongsTo(Medecin);
Medecin.hasMany(Consultation);

Consultation.belongsTo(Patient);
Patient.hasMany(Consultation);

Consultation.hasOne(RapportConsultation);
RapportConsultation.belongsTo(Consultation);

Patient.hasOne(DossierMedical);
DossierMedical.belongsTo(Patient);

ChatRoom.hasMany(Message);
Message.belongsTo(ChatRoom);

Message.belongsTo(Utilisateur);
Utilisateur.hasMany(Message);

// Synchronisation des modèles avec la base de données
sequelize.sync()
  .then(() => {
    console.log('Modèles synchronisés avec la base de données');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation des modèles:', err);
  });
