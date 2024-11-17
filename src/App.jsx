import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import styles from './App.css';

import Advantages from './pages/Advantages';
import Rates from './pages/Rates';
import Stocks from './pages/Stocks';
import Promotariff from './pages/Promotariff';
import ESIM from './pages/ESIM';
import Connection from './pages/Connection';
import Bell from './components/Bell';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 885);

  const handleResize = () => setIsDesktop(window.innerWidth >= 885);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('noOverflow', !isDesktop && isMenuOpen);
  }, [isMenuOpen, isDesktop]);

  return (
    <Router>
      <div className={isMenuOpen && !isDesktop ? 'modal' : ''}>
        <Header
          isDesktop={isDesktop}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
        <NavMenu isDesktop={isDesktop} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>
      </div>
      <main className={isMenuOpen && !isDesktop ? 'overflow' : ''}>
        <Routes>
          <Route path="/Advantages" element={<Advantages />} />
          <Route path="/Rates" element={<Rates />} />
          <Route path="/Stocks" element={<Stocks />} />
          <Route path="/Promotariff" element={<Promotariff />} />
          <Route path="/eSIM" element={<ESIM />} />
          <Route path="/Connection" element={<Connection />} />
          <Route path="*" element={<Navigate to="/Advantages" replace />} />
        </Routes>
      </main>
    </Router>
  );
};

const Header = ({ isDesktop, isMenuOpen, toggleMenu }) => (
  <header className='header'>
    <img src="assets/logo.svg" alt="Logo" />
    {isDesktop ? (
      <div className='flex'>
        <div className='location'>
          <img src="assets/location.svg" alt="Location" />
          <span>Москва и область</span>
        </div>
        <Bell className='bell' />
      </div>
    ) : (
      <div className='flex'>
        {!isMenuOpen && <Bell className='bell' />}
        <img
          src={isMenuOpen ? 'assets/close.svg' : 'assets/burger.svg'}
          alt="Menu Toggle"
          onClick={toggleMenu}
        />
      </div>
    )}
  </header>
);

const NavMenu = ({ isDesktop, isMenuOpen, toggleMenu }) => (
  (isMenuOpen || isDesktop) && (
    <>
    <div className='navContainer'>
      <nav className='nav'>
        <NavLink onClick={()=>isMenuOpen ?toggleMenu():''} to="/Advantages">Преимущества Tele2</NavLink>
        <NavLink onClick={()=>isMenuOpen ?toggleMenu():''} to="/Rates">Тарифы</NavLink>
        <NavLink onClick={()=>isMenuOpen ?toggleMenu():''} to="/Stocks">Акции и спецпредложения</NavLink>
        <NavLink onClick={()=>isMenuOpen ?toggleMenu():''} to="/Promotariff">Промотариф Tele2</NavLink>
        <NavLink onClick={()=>isMenuOpen ?toggleMenu():''} to="/eSIM">Технология eSIM</NavLink>
        <NavLink onClick={()=>isMenuOpen ?toggleMenu():''} to="/Connection">Подключение нового абонента</NavLink>
      </nav>
    </div>
    {!isDesktop && (
      <div className='location'>
        <img src="assets/location.svg" alt="Location" />
        <span>Москва и область</span>
      </div>
    )}
    </>
  )
);

export default App;
