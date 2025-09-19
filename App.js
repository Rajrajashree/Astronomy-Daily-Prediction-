import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page at /astronomy */}
        <Route path="/astronomy" element={<LandingPage />} />

        {/* Auth modal inside landing page */}
        <Route path="/astronomy/auth" element={<AuthForm />} />

        {/* Dashboard after login */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
