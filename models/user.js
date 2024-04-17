const mongoose = require('mongoose');

// Définir le schéma utilisateur
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Créer le modèle User à partir du schéma défini
const User = mongoose.model('User', userSchema);

module.exports = User;