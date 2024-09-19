import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Survey from './components/Survey';
import Main from './components/Main';
import PrivateRoute from './utils/PrivateRoute';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(null);

  useEffect(() => {
    const surveyStatus = localStorage.getItem('hasCompletedSurvey');
    setHasCompletedSurvey(surveyStatus === 'true');
  }, []);

  const handleLoginSuccess = (completedSurvey) => {
    setHasCompletedSurvey(completedSurvey);
    localStorage.setItem('hasCompletedSurvey', completedSurvey);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hasCompletedSurvey');
    window.location.href = '/';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/survey" element={
          <PrivateRoute>
            {hasCompletedSurvey ? <Navigate to="/main" /> : <Survey />}
          </PrivateRoute>
        } />
        <Route path="/main" element={
          <PrivateRoute>
            <Main handleLogout={handleLogout} />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

