// models/Activity.js

const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Referencia al paciente
  activityType: { type: String, required: true },  // Tipo de actividad
  date: { type: Date, required: true },  // Fecha y hora de la actividad
  isCompleted: { type: Boolean, default: false },  // Estado de la actividad
});

module.exports = mongoose.model('Activity', ActivitySchema);
