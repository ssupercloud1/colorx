// About.js
import React from 'react';
import './About.css'; // Create a separate CSS file for styling
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container" style={{ maxWidth: '100%' }}>
      <h2>About Colorx</h2>
      <p>
        Welcome to Colorx, where creativity meets color! Colorx is more than just a platform; it's your go-to resource for all things related to colors. Whether you're a designer seeking inspiration, an artist exploring new palettes, or someone who simply loves colors, Colorx has something special for you.
      </p>
      
      <div className="feature-container">
        <div className="feature">
          <div className="color-animation color-code-generator"></div>
          <h3>Color Code Generator</h3>
          <p>
            Unleash your imagination with our <Link to="/color-info">intuitive color code generator</Link>. Easily create vibrant color codes for your projects. From HEX to RGB and HSL, Colorx has you covered.
          </p>
        </div>
        
        <div className="feature">
          <div className="color-animation palette-generator"></div>
          <h3>Palette Generator</h3>
          <p>
            Dive into the world of palettes! Our <Link to="/palette-generator">palette generator</Link> lets you explore harmonious color combinations. Experiment, discover and find the perfect palette that resonates with your creative vision.
          </p>
        </div>
        
        <div className="feature">
          <div className="color-animation color-info"></div>
          <h3>Contrast Checker</h3>
          <p>
            Need accessability about text color and background color? Find color contrast effortlessly using our <Link to="/contrast-checker">contrast checker</Link>. You've a color code or not, our intuitive checker has you covered with a color picker.
          </p>
        </div>
        
        <div className="feature">
          <div className="color-animation color-library"></div>
          <h3>Color Library</h3>
          <p>
            Surf through an expansive <Link to="/library">color library</Link> filled with a diverse range of hues. Discover trending colors, historical classics, and everything in between. The possibilities are endless!
          </p>
        </div>
      </div>
      
      <p>
        But that's not all—Colorx offers a range of features to elevate your color experience. Export your favorite palettes as PNG files, create <Link to="/color-gradient">color gradients</Link>, and enjoy the thrill of <Link to="/color-info">random color code generation</Link>.
      </p>
      
      <p>
        At Colorx, we believe in making colors accessible and enjoyable for everyone. Join our vibrant community of color enthusiasts and let your creativity shine! Your journey with color starts here.
      </p>
    </div>
  );
};

export default About;
