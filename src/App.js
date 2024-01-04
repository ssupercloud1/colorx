// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ColorInfo from './ColorInfo';
import ColorLibrary from './ColorLibrary';
import PaletteGenerator from './PaletteGenerator';
import About from './About';
import Terms from './Terms';
import Cookies from './Cookies';
import Contact from './Contact';
import Privacy from './Privacy';
import ColorMix from './ColorMix';
import ContrastChecker from './ContrastChecker';
import ColorGradient from './ColorGradient';
import PalettesImage from './Palettes24.png';
import CodesImage from './Codes24.png';
import ContrastImage from './Contrast24.png';
import GradientsImage from './Gradients24.png';
import MixersImage from './Mixers24.png';
import LibraryImage from './Library24.png';

const boxStyle = {
  // Add your box styles here
  padding: '20px',
  margin: 'auto',
  textAlign: 'left',
  width: '40%',
  maxWidth: '100%',
};

const imageStyle = {
  // Add your image styles here
  width: '100%',
  height: 'auto',
  marginTop: '10px',
};

const Home = () => (
  <div style={{ maxWidth: '100%', justifyContent: 'center', textAlign: 'center', margin: 'auto' }}>
    <h1 style={{ textAlign: 'center' }}>Your One-Stop App for All Things Colorful</h1>
        <p>
          Colorx is a comprehensive web app that offers a wide range of tools to help you create and experiment with colors. With Colorx, you can generate palettes, <Link to="/color-info">color codes</Link>, and even check contrast of colors. The app also includes a color finder, <Link to="/color-gradient">color gradient</Link>, and a <Link to="/library">library of colors</Link> to choose from.
        </p>
        <p>
          Whether you’re a designer, artist, or just someone who loves playing with colors, Colorx has everything you need to get started. So why wait? Start exploring the world of colors like never before!
        </p>
    <div className="container" style={{ maxWidth: '100%', display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
      {/* Your landing page content */}
      <div className="box" style={boxStyle}>
        <h2>Palette Generator</h2>
        <p>Start using <Link to="/palette-generator">Palette Generator now</Link>. Create random palettes, gradient palettes, shades, tints, and tones. Once you're satisifed with your color palette, hit EXPORT button and find your palette in your downloads!</p>
        <img src={PalettesImage} alt="Palettes" style={imageStyle} />
      </div>

      <div className="box" style={boxStyle}>
        <h2>Code Generator</h2>
        <p>Generate color codes (HEX, RGB, HSV, HSL & CMYK) easily. Jump to <Link to="/color-info">Color Code Generator</Link> now!</p>
        <img src={CodesImage} alt="Codes" style={imageStyle} />
      </div>

      <div className="box" style={boxStyle}>
        <h2>Contrast Checker</h2>
        <p>Use our <Link to="/contrast-checker">intuitive contrast checker</Link> to determine accessibility of text and background color.</p>
        <img src={ContrastImage} alt="Contrast" style={imageStyle} />
      </div>

      <div className="box" style={boxStyle}>
        <h2>Color Gradient</h2>
        <p>Create exciting <Link to="/color-gradient">color gradients</Link> by entering a base color and adjusting settings.</p>
        <img src={GradientsImage} alt="Gradients" style={imageStyle} />
      </div>

      <div className="box" style={boxStyle}>
        <h2>Color Mixer</h2>
        <p>Mix colors in different ratios to see amazing results. Jump to <Link to="/color-mix">Color Mixer</Link> and play with colors!</p>
        <img src={MixersImage} alt="Mixers" style={imageStyle} />
      </div>

      <div className="box" style={boxStyle}>
        <h2>Color Library</h2>
        <p>Explore our expansive <Link to="/library">color library</Link>, regularly updated to meet your color needs.</p>
        <img src={LibraryImage} alt="Library" style={imageStyle} />
      </div>
    </div>
  </div>
);

const Colorx = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Define your routes outside the Colorx component
  const routesConfig = [
    { path: '/colorx', element: <Home /> },
    { path: '/color-info', element: <ColorInfo /> },
    { path: '/palette-generator', element: <PaletteGenerator /> },
    { path: '/contrast-checker', element: <ContrastChecker /> },
    { path: '/color-gradient', element: <ColorGradient /> },
    { path: '/color-mix', element: <ColorMix /> },
    { path: '/library', element: <ColorLibrary /> },
    { path: '/about', element: <About /> },
    { path: '/terms', element: <Terms /> },
    { path: '/cookies', element: <Cookies /> },
    { path: '/contact', element: <Contact /> },
    { path: '/privacy-policy', element: <Privacy /> },
  ];

  return (
    <Router>
      <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
        <nav className="navbar">
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {/* Update the Link for the home page */}
            <Link to="/colorx" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/color-info" onClick={closeMenu}>
              Code Generator
            </Link>
            <Link to="/palette-generator" onClick={closeMenu}>
              Palette Generator
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

        {/* Home Content */}
        <Routes>
          {routesConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>

        <footer style={{ paddingTop: '30px', color: 'white' }}>
          <div className="footer-links" style={{ justifyContent: 'center', paddingTop: '20px', display: 'flex', gap: '10px' }}>
            <Link to="/colorx" onClick={closeMenu} style={{ color: 'white' }}>
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
