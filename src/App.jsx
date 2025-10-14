import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Awards from './pages/Awards'
import History from './pages/History'
import VisionMission from './pages/VisionMission'
import InfoSecurity from './pages/InfoSecurity'
import Csr from './pages/Csr'
import Careers from './pages/Careers'
import ContactUs from './pages/ContactUs'
import SearchResults from './pages/SearchResults'
import WpPostDetail from './components/WpPostDetail'
import Environmental from './pages/Environmental'
import './App.css'
import { WP_API } from './constants/wp'

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // derive a simple currentPage key from pathname for Navbar highlighting
  const pathname = location.pathname || '/';
  let currentPage = null;
  if (pathname === '/') currentPage = 'home';
  else if (pathname.startsWith('/awards')) currentPage = 'awards';
  else if (pathname.startsWith('/history')) currentPage = 'history';
  else if (pathname.startsWith('/vision-mission')) currentPage = 'vision-mission';
  else if (pathname.startsWith('/info-security')) currentPage = 'info-security';
  else if (pathname.startsWith('/csr')) currentPage = 'csr';
  else if (pathname.startsWith('/environmental')) currentPage = 'environmental';
  else if (pathname.startsWith('/careers')) currentPage = 'careers';
  else if (pathname.startsWith('/contact')) currentPage = 'contact';

  const navigateTo = (page, params = null) => {
    // preserve previous behavior for components using onNavigate
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'awards':
        navigate('/awards');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'vision-mission':
        navigate('/vision-mission');
        break;
      case 'info-security':
        navigate('/info-security');
        break;
      case 'environmental':
        navigate('/environmental');
        break;
      case 'careers':
        navigate('/careers');
        break;
      case 'csr':
        navigate('/csr');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'search':
        if (params && params.query) navigate(`/search?q=${encodeURIComponent(params.query)}`);
        else navigate('/search');
        break;
      case 'post':
        if (params && params.id) navigate(`/posts/${params.id}`);
        break;
      default:
        navigate('/');
    }

    // scroll to top when navigating programmatically
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Home onNavigate={navigateTo} onOpenPost={(id) => navigateTo('post', { id })} />} />
        <Route path="/awards" element={<Awards onNavigate={navigateTo} />} />
        <Route path="/history" element={<History onNavigate={navigateTo} />} />
        <Route path="/vision-mission" element={<VisionMission onNavigate={navigateTo} />} />
        <Route path="/csr" element={<Csr onNavigate={navigateTo} />} />
    <Route path="/environmental" element={<Environmental onNavigate={navigateTo} />} />
    <Route path="/careers" element={<Careers onNavigate={navigateTo} />} />
    <Route path="/contact" element={<ContactUs onNavigate={navigateTo} />} />
  <Route path="/posts/:id" element={<WpPostDetail baseUrl={WP_API} onBack={() => navigateTo('home')} />} />
  <Route path="/search" element={<SearchResults />} />
  <Route path="/info-security" element={<InfoSecurity onNavigate={navigateTo} />} />
      </Routes>
    </div>
  )
}

export default App
