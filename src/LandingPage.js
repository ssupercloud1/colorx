// LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ maxWidth: '80%', margin: 'auto', marginTop: '10px', padding: '10px', alignItems: 'center', border: '1px solid #ccc', borderRadius: '15px' }}>
      <h1 style={{ textAlign: 'center' }}>Colorx: Your One-Stop Shop for All Things Colorful</h1>
        <p>
          Colorx is a comprehensive web app that offers a wide range of tools to help you create and experiment with colors. With Colorx, you can generate palettes, <Link to="/code-generator">color codes</Link>, and even check contrast of colors. The app also includes a color finder, <Link to="/color-gradient">color gradient</Link>, and a <Link to="/library">library of colors</Link> to choose from.
        </p>
        <p>
          Whether you’re a designer, artist, or just someone who loves playing with colors, Colorx has everything you need to get started. So why wait? Start exploring the world of colors like never before!
        </p>
		<p>
		  Visit this page to start using the contrast checker or continue with generating color palettes.
		</p>
    </div>
  );
};

export default LandingPage;
