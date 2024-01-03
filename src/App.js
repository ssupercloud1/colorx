// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import './App.css';
import ColorInfo from './ColorInfo';
import ColorLibrary from './ColorLibrary';
import PaletteGenerator from './PaletteGenerator';
import CodeGenerator from './CodeGenerator';
import About from './About';
import Terms from './Terms';
import Cookies from './Cookies';
import Contact from './Contact';
import Privacy from './Privacy';
import ColorMix from './ColorMix';
import ContrastChecker from './ContrastChecker';
import ColorGradient from './ColorGradient';
import LandingPage from './LandingPage'; // Import the LandingPage component

const Colorx = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Router>
      <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
        <nav className="navbar">
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/palette-generator" onClick={closeMenu}>
              Palette Generator
            </Link>
            <Link to="/code-generator" onClick={closeMenu}>
              Code Generator
            </Link>
            <Link to="/contrast-checker" onClick={closeMenu}>
              Contrast Checker
            </Link>
            <Link to="/color-gradient" onClick={closeMenu}>
              Color Gradient
            </Link>
            <Link to="/color-mix" onClick={closeMenu}>
              Mixer
            </Link>
            <Link to="/color-info" onClick={closeMenu}>
              Finder
            </Link>
            <Link to="/library" onClick={closeMenu}>
              Library
            </Link>
          </div>
        </nav>

        <div className="ribbon">
          <h1 style={{ padding: '5px', textAlign: 'left', marginLeft: '10px' }}>Colorx</h1>
        </div>

        <div className="sub-ribbon">
          <div className="color-box-container">
            <div className="color-box"></div>
            <div className="color-box"></div>
            <div className="color-box"></div>
            <div className="color-box"></div>
            <div className="color-box"></div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/palette-generator" element={<PaletteGenerator />} />
          <Route path="/code-generator" element={<CodeGenerator />} />
          <Route path="/contrast-checker" element={<ContrastChecker />} />
          <Route path="/color-gradient" element={<ColorGradient />} />
          <Route path="/color-mix" element={<ColorMix />} />
          <Route path="/color-info" element={<ColorInfo />} />
          <Route path="/library" element={<ColorLibrary />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
        </Routes>

        <footer style={{ paddingTop: '30px', color: 'white' }}>
          <div className="footer-links" style={{ justifyContent: 'center', paddingTop: '20px', display: 'flex', gap: '10px' }}>
            <Link to="/" onClick={closeMenu} style={{ color: 'white' }}>
              Home
            </Link>
            <Link to="/about" onClick={closeMenu} style={{ color: 'white' }}>
              About
            </Link>
            <Link to="/contact" onClick={closeMenu} style={{ color: 'white' }}>
              Contact Us
            </Link>
            <Link to="/terms" onClick={closeMenu} style={{ color: 'white' }}>
              Terms of Use
            </Link>
            <Link to="/privacy-policy" onClick={closeMenu} style={{ color: 'white' }}>
              Privacy Policy
            </Link>
            <Link to="/cookies" onClick={closeMenu} style={{ color: 'white' }}>
              Cookies
            </Link>
          </div>
          <p>&copy; 2023 Colorx. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default Colorx;
