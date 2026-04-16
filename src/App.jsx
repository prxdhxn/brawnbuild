import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MotivationPopup from './components/MotivationPopup';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import AnatomyViewer from './pages/AnatomyViewer';
import InjuryHelp from './pages/InjuryHelp';
import BMITracker from './pages/BMITracker';
import MealPlanner from './pages/MealPlanner';
import Login from './pages/Login';
import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null; // loading screen could go here
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <MotivationPopup />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-ambient-layer"></div>
        <div className="app-container border-box">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes wrapped in Layout */}
            <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><Layout><AIAssistant /></Layout></ProtectedRoute>} />
            <Route path="/anatomy" element={<ProtectedRoute><Layout><AnatomyViewer /></Layout></ProtectedRoute>} />
            <Route path="/injury-help" element={<ProtectedRoute><Layout><InjuryHelp /></Layout></ProtectedRoute>} />
            <Route path="/bmi-tracker" element={<ProtectedRoute><Layout><BMITracker /></Layout></ProtectedRoute>} />
            <Route path="/meal-planner" element={<ProtectedRoute><Layout><MealPlanner /></Layout></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
