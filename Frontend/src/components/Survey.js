import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Survey = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [answers, setAnswers] = useState(Array(7).fill(''));
  const [parkinsonLevel, setParkinsonLevel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();  // Hook para redireccionar

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateParkinsonLevel = () => {
    const total = answers.reduce((acc, answer) => acc + parseInt(answer), 0);
    if (total <= 7) return 'Bajo';
    if (total <= 14) return 'Moderado';
    return 'Alto';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const level = calculateParkinsonLevel();
    setParkinsonLevel(level);

    setShowModal(true);

    try {
      await axios.post('http://localhost:5000/api/survey', {
        name,
        age,
        answers,
        level
      });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  const closeAndRedirect = () => {
    setShowModal(false);
    navigate('/main');  // Redirecciona a la pantalla principal
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Test de Parkinson</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre del Paciente</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Edad del Paciente</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

       
{/* Preguntas */}
        <div className="mb-3">
          <label>¿Tienes temblores en reposo?</label>
          <select
            className="form-select"
            value={answers[0]}
            onChange={(e) => handleAnswerChange(0, e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            <option value="0">No</option>
            <option value="1">Leve</option>
            <option value="2">Moderado</option>
            <option value="3">Grave</option>
          </select>
        </div>

        <div className="mb-3">
          <label>¿Tienes dificultades para caminar?</label>
          <select
            className="form-select"
            value={answers[1]}
            onChange={(e) => handleAnswerChange(1, e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            <option value="0">No</option>
            <option value="1">Leve</option>
            <option value="2">Moderado</option>
            <option value="3">Grave</option>
          </select>
        </div>

        <div className="mb-3">
          <label>¿Tienes rigidez muscular?</label>
          <select
            className="form-select"
            value={answers[2]}
            onChange={(e) => handleAnswerChange(2, e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            <option value="0">No</option>
            <option value="1">Leve</option>
            <option value="2">Moderado</option>
            <option value="3">Grave</option>
          </select>
        </div>

        <div className="mb-3">
          <label>¿Tienes movimientos lentos (bradicinesia)?</label>
          <select
            className="form-select"
            value={answers[3]}
            onChange={(e) => handleAnswerChange(3, e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            <option value="0">No</option>
            <option value="1">Leve</option>
            <option value="2">Moderado</option>
            <option value="3">Grave</option>
          </select>
        </div>

        <div className="mb-3">
          <label>¿Sientes desequilibrio frecuente?</label>
          <select
            className="form-select"
            value={answers[4]}
            onChange={(e) => handleAnswerChange(4, e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            <option value="0">No</option>
            <option value="1">Leve</option>
            <option value="2">Moderado</option>
            <option value="3">Grave</option>
          </select>
        </div>

        <div className="mb-3">
          <label>¿Tienes dificultades para escribir o dibujar?</label>
          <select
            className="form-select"
            value={answers[5]}
            onChange={(e) => handleAnswerChange(5, e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            <option value="0">No</option>
            <option value="1">Leve</option>
            <option value="2">Moderado</option>
            <option value="3">Grave</option>
          </select>
        </div>

        <div className="mb-3">
          <label>¿Tienes dificultades para hablar o entender a los demás?</label>
          <select
            className="form-select"
            value={answers[6]}
            onChange={(e) => handleAnswerChange(6, e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            <option value="0">No</option>
            <option value="1">Leve</option>
            <option value="2">Moderado</option>
            <option value="3">Grave</option>
          </select>
        </div>





       

        <button type="submit" className="btn btn-primary w-100">Enviar Respuestas</button>
      </form>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Resultado de la Encuesta</h5>
              <button type="button" className="btn-close" onClick={closeAndRedirect}></button>
            </div>
            <div className="modal-body">
              <p><strong>Nombre:</strong> {name}</p>
              <p><strong>Edad:</strong> {age}</p>
              <p><strong>Nivel de Parkinson:</strong> {parkinsonLevel}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeAndRedirect}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;

