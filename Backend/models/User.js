const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    hasCompletedSurvey: { type: Boolean, default: false }  // Nuevo campo

});

module.exports = mongoose.model('User', userSchema);
