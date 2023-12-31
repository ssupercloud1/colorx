// App.js

import React, { useState } from 'react';
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
import ColorMix from './ColorMix'; // Adjust the path based on your project structure

const Colorx = () => {
  const [activeMenu, setActiveMenu] = useState('Code Generator');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setMenuOpen(false);
    scrollToTop();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  let content;

  switch (activeMenu) {
    case 'Code Generator':
      content = <CodeGenerator />;
      break;
    case 'Palette Generator':
      content = <PaletteGenerator />;
      break;
    case 'Color Info':
      content = <ColorInfo />;
      break;
    case 'Library':
      content = <ColorLibrary />;
      break;
    case 'Color Mix':
      content = <ColorMix />;
      break;
    case 'About':
      content = <About />;
      break;
    case 'Terms':
      content = <Terms />;
      break;
    case 'Cookies':
      content = <Cookies />;
      break;
    case 'Contact Us':
      content = <Contact />;
      break;
    case 'Privacy Policy':
      content = <Privacy />;
      break;
    default:
      content = <CodeGenerator />;
  }

  return (
    <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
      <nav className="navbar">
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => handleMenuClick('Code Generator')}>
            Code Generator
          </button>
          <button onClick={() => handleMenuClick('Palette Generator')}>
            Palette Generator
          </button>
          <button onClick={() => handleMenuClick('Color Info')}>
            Color Info
          </button>
          <button onClick={() => handleMenuClick('Library')}>
            Library
          </button>
          <button onClick={() => handleMenuClick('Color Mix')}>Color Mix</button>
        </div>
      </nav>

      <div className="ribbon">
        <h2 style={{ paddingTop: '2px' }}>Colorx</h2>
        <p>
          Become creative with colors
        </p>
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

      {content}

      <footer style={{ paddingTop: '30px' }}>
        <div className="footer-links" style={{ paddingTop: '20px' }}>
          <button onClick={() => handleMenuClick('Code Generator')}>Home</button>
          <button onClick={() => handleMenuClick('About')}>About</button>
          <button onClick={() => handleMenuClick('Contact Us')}>Contact Us</button>
          <button onClick={() => handleMenuClick('Terms')}>Terms of Use</button>
          <button onClick={() => handleMenuClick('Privacy Policy')}>Privacy Policy</button>
          <button onClick={() => handleMenuClick('Cookies')}>Cookies</button>
        </div>
        <p>&copy; 2023 Colorx. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Colorx;
