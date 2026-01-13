import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from './HomePage';
import TrackingPage from './TrackingPage';
import ServicesPage from './ServicesPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import FAQPage from './FAQPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-50">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={currentUser} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tracking" element={<TrackingPage user={currentUser} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route 
              path="/login" 
              element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={currentUser ? <Navigate to="/dashboard" /> : <RegisterPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={currentUser ? <DashboardPage user={currentUser} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;