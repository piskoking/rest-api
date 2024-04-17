const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js');

require('dotenv').config({path : "./config/.env"});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Route GET pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route POST pour ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    // Ajoutez d'autres champs selon votre schéma
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route PUT pour modifier un utilisateur par son identifiant
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route DELETE pour supprimer un utilisateur par son identifiant
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});