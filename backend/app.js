const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Utilisateur, Medecin, Patient } = require('./models');

const app = express();
app.use(express.json());


app.listen(5000, () => {
  console.log('Serveur démarré sur le port 3000');
});
// Création de compte utilisateur
app.post('/register', async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, role, date_de_naissance } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await Utilisateur.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Créer l'utilisateur
    let user;
    if (role === 'médecin') {
      user = await Medecin.create({
        nom,
        prenom,
        email,
        mot_de_passe: hashedPassword,
        role,
        date_de_naissance
      });
    } else {
      user = await Patient.create({
        nom,
        prenom,
        email,
        mot_de_passe: hashedPassword,
        role,
        date_de_naissance
      });
    }

    res.status(201).json(user);
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
    const token = jwt.sign({ userId: user.id }, 'votre_cle_secrete', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ...

// Middleware pour vérifier le token d'authentification
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'votre_cle_secrete');
    req.user = await Utilisateur.findByPk(decoded.userId);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token d\'authentification invalide' });
  }
};

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