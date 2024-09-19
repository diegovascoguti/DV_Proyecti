const express = require('express');
const Survey = require('../models/Survey');  // Crea el modelo Survey
const router = express.Router();

// Ruta POST para guardar la encuesta
router.post('/', async (req, res) => {
  const { name, age, answers, level } = req.body;
  try {
    const survey = new Survey({ name, age, answers, level });
    await survey.save();
    res.status(201).send('Encuesta guardada exitosamente');
  } catch (error) {
    res.status(400).send('Error al guardar la encuesta');
  }
});

// Ruta GET para obtener la última encuesta guardada
router.get('/last', async (req, res) => {
  try {
    const lastSurvey = await Survey.findOne().sort({ _id: -1 });  // Obtener el último registro
    res.json(lastSurvey);
  } catch (error) {
    res.status(500).send('Error al recuperar la encuesta');
  }
});

module.exports = router;

