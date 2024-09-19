// routes/activity.js

const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();

// Ruta para agregar una actividad
router.post('/add', async (req, res) => {
  const { patientId, activityType, date } = req.body;
  try {
    const newActivity = new Activity({ patientId, activityType, date });
    await newActivity.save();
    res.status(201).json({ message: 'Actividad agregada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al agregar actividad', error });
  }
});

// Ruta para consultar actividades
router.get('/all', async (req, res) => {
  const { patientId, startDate, endDate } = req.query;

  if (!patientId) {
    return res.status(400).json({ message: 'ID de paciente faltante' });
  }

  try {
    const activities = await Activity.find({
      patientId,
      // Si no hay fechas, no las uses en la consulta
      ...(startDate && endDate && {
        date: { $gte: new Date(startDate), $lte: new Date(endDate) }
      })
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ message: 'Error al consultar actividades', error });
  }
});



// Ruta para editar una actividad
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { activityType, date, isCompleted } = req.body;
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(id, { activityType, date, isCompleted }, { new: true });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: 'Error al editar la actividad', error });
  }
});

// Ruta para eliminar una actividad
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Activity.findByIdAndDelete(id);
    res.status(200).json({ message: 'Actividad eliminada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la actividad', error });
  }
});

module.exports = router;

