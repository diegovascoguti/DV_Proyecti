const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Busca al usuario por nombre de usuario
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

  // Verifica la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

  // Crea un token JWT con el `patientId` del usuario
  const token = jwt.sign({ patientId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Envía el token de vuelta al frontend
  res.status(200).json({ token });
});

// Ruta de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Usuario no encontrado');

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Contraseña incorrecta');

    // Generar el token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
