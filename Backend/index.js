// index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/survey');
const activityRoutes = require('./routes/activity');  // Importa las rutas de actividades

app.use('/api/auth', authRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/activity', activityRoutes);  // Asigna las rutas de actividad al prefijo /api/activity

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
