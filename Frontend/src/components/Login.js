import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Para redirigir programáticamente

  // Cambia entre registro e inicio de sesión
  const toggleMode = () => {
    setIsRegister(!isRegister);
    setMessage('');
  };

  // Validar los campos
  const validateFields = () => {
    if (username.trim() === '' || password.trim() === '') {
      setMessage('Por favor, rellena todos los campos.');
      return false;
    }
    if (isRegister && email.trim() === '') {
      setMessage('El correo electrónico es obligatorio para el registro.');
      return false;
    }
    return true;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      if (isRegister) {
        // Proceso de registro
        const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
        setMessage('Usuario registrado exitosamente');
      } else {
        // Proceso de inicio de sesión
        const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        const { token, hasCompletedSurvey } = response.data;

        // Guarda el token JWT en el localStorage
        localStorage.setItem('token', token);  
        localStorage.setItem('hasCompletedSurvey', hasCompletedSurvey);  // Si completó la encuesta

        // Llama a la función que maneja el éxito de la sesión
        onLoginSuccess(hasCompletedSurvey);  

        // Redirige según el estado de la encuesta
        if (hasCompletedSurvey) {
          navigate('/main');  // Redirige al menú principal
        } else {
          navigate('/survey');  // Redirige a la encuesta si no la ha completado
        }
      }
    } catch (err) {
      setMessage(isRegister ? 'Error al registrar usuario' : 'Login fallido');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Web de cuidadores de pacientes</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center">{isRegister ? 'Registro' : 'Login'}</h2>
              {message && <p className="alert alert-warning">{message}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Nombre de usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                {isRegister && (
                  <div className="mb-3">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
              </form>

              <button onClick={toggleMode} className="btn btn-link mt-3 d-block text-center">
                {isRegister ? 'Ya tengo cuenta. Iniciar Sesión' : 'Crear una cuenta nueva'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


