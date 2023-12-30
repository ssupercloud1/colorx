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

const Colorx = () => {
  const [activeMenu, setActiveMenu] = useState('Code Generator');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      {/* Top Navbar */}
      <nav className="navbar">
        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        {/* Navigation Links */}
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
        </div>
      </nav>

      {/* Main Ribbon */}
      <div className="ribbon">
        <h2>Colorx: Become Creative With Colors</h2>
        <p>
          Colorx is the ultimate color platform that provides a one-stop solution for all your color needs.
        </p>
      </div>

      {/* Sub-Ribbon with Color Box Animation */}
      <div className="sub-ribbon">
        <div className="color-box-container">
          <div className="color-box"></div>
          <div className="color-box"></div>
          <div className="color-box"></div>
          <div className="color-box"></div>
          <div className="color-box"></div>
        </div>
      </div>

      {/* Render the selected component */}
      {content}

      {/* Footer */}
      <footer>
        <div className="footer-links" style={{ paddingTop: '10px' }}>
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
