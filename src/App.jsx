import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Awards from './pages/Awards'
import History from './pages/History'
import VisionMission from './pages/VisionMission'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      {currentPage === 'home' && <Home onNavigate={navigateTo} />}
      {currentPage === 'awards' && <Awards onNavigate={navigateTo} />}
      {currentPage === 'history' && <History onNavigate={navigateTo} />}
      {currentPage === 'vision-mission' && <VisionMission onNavigate={navigateTo} />}
    </div>
  )
}

export default App