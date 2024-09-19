import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs } from 'react-bootstrap'; // Importar Tabs
import ActivityManager from './ActivityManager';

const Main = ({ handleLogout }) => {
  const [surveyData, setSurveyData] = useState({
    name: '',
    age: '',
    level: '',
    answers: []
  });

  const questions = [
    'Temblores en reposo',
    'Dificultades para caminar',
    'Rigidez muscular',
    'Movimientos lentos (bradicinesia)',
    'Desequilibrio frecuente',
    'Dificultades para escribir o dibujar',
    'Dificultades para hablar o entender a los demás'
  ];

  const mapAnswerToText = (answer) => {
    switch (answer) {
      case '0': return 'No';
      case '1': return 'Leve';
      case '2': return 'Moderado';
      case '3': return 'Grave';
      default: return 'N/A';
    }
  };

  const getIconForAnswer = (answer) => {
    switch (answer) {
      case 'No': return <FontAwesomeIcon icon={faCheck} className="text-primary" />;
      case 'Leve': return <FontAwesomeIcon icon={faArrowDown} className="text-success" />;
      case 'Moderado': return <FontAwesomeIcon icon={faArrowUp} className="text-warning" />;
      case 'Grave': return <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger" />;
      default: return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/survey/last');
        if (response.data) {
          setSurveyData(response.data);
        }
      } catch (error) {
        console.error('Error al recuperar los datos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-end mb-3">
        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
      </div>
      <h1 className="text-center mb-4">App cuidador de paciente</h1>

      {/* Card Horizontal */}
      <div className="card mb-5 shadow-sm">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="p-3">
              <h4 className="card-title">Paciente: {surveyData.name || 'N/A'}</h4>
              <p className="card-text">Edad: {surveyData.age || 'N/A'}</p>
              <p className="card-text">Nivel de Parkinson: {surveyData.level || 'N/A'}</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Resultado Test</h5>
              {surveyData.answers.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {surveyData.answers.map((answer, index) => {
                    const textAnswer = mapAnswerToText(answer);
                    return (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                        {questions[index]}: {textAnswer}
                        <span>{getIconForAnswer(textAnswer)}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No hay respuestas disponibles</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultActiveKey="gestión" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="gestión" title="Gestión de Tareas">
          <ActivityManager />
        </Tab>
        <Tab eventKey="apoyo" title="Red de Apoyo">
          <div>
            <strong>Conéctate con otros cuidadores.</strong> Participa en conversaciones con cuidadores para compartir experiencias.
          </div>
        </Tab>
        <Tab eventKey="información" title="Información del Paciente">
          <div>
            <strong>Detalles adicionales del paciente.</strong> Aquí puedes ver y editar la información del paciente.
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Main;

