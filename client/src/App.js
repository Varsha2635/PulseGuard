import React,{useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import HearDisease from './components/HeartDiseasePrediction/HearDisease';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/Chat';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  return (
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/prediction" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <HearDisease />
              <Chat/>
            </PrivateRoute>
        } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
  );
}

export default App;