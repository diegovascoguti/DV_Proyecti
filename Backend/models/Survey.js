const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  answers: { type: [String], required: true },
  level: { type: String, required: true }
});

module.exports = mongoose.model('Survey', surveySchema);




