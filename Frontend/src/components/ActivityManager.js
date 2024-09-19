import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ActivityManager = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ activityType: '', date: '', isCompleted: false });
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setPatientId(decodedToken.patientId);
    }
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        if (patientId) {
          const response = await axios.get('http://localhost:5000/api/activity/all', { params: { patientId } });
          setActivities(response.data);
        }
      } catch (error) {
        console.error('Error al cargar las actividades', error);
      }
    };
    if (patientId) fetchActivities();
  }, [patientId]);

  const addActivity = async () => {
    try {
      if (!newActivity.activityType || !newActivity.date) {
        console.error('Complete los campos');
        return;
      }

      await axios.post('http://localhost:5000/api/activity/add', { ...newActivity, patientId });
      setNewActivity({ activityType: '', date: '', isCompleted: false });
      const response = await axios.get('http://localhost:5000/api/activity/all', { params: { patientId } });
      setActivities(response.data);
    } catch (error) {
      console.error('Error al agregar actividad', error);
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      await axios.delete(`http://localhost:5000/api/activity/delete/${activityId}`);
      const response = await axios.get('http://localhost:5000/api/activity/all', { params: { patientId } });
      setActivities(response.data);
    } catch (error) {
      console.error('Error al eliminar actividad:', error);
    }
  };

  const handleStatusChange = async (activityId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/activity/update/${activityId}`, {
        isCompleted: newStatus === 'Sí'
      });
      const response = await axios.get('http://localhost:5000/api/activity/all', { params: { patientId } });
      setActivities(response.data); // Actualiza la lista de actividades después del cambio
    } catch (error) {
      console.error('Error al actualizar el estado de la actividad', error);
    }
  };

  return (
    <div>
      <h3>Gestión de Actividades</h3>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Tipo de actividad"
          className="form-control mb-2"
          value={newActivity.activityType}
          onChange={(e) => setNewActivity({ ...newActivity, activityType: e.target.value })}
        />
        <input
          type="datetime-local"
          className="form-control mb-2"
          value={newActivity.date}
          onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
        />
        <button onClick={addActivity} className="btn btn-primary">Agregar Actividad</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Tipo de Actividad</th>
            <th>Fecha-Hora</th>
            <th>¿Cumplida?</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.activityType}</td>
              <td>{new Date(activity.date).toLocaleString()}</td>
              <td>
                <select
                  className="form-select"
                  value={activity.isCompleted ? 'Sí' : 'No'}
                  onChange={(e) => handleStatusChange(activity._id, e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                </select>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteActivity(activity._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityManager;

