// About.js
import React from 'react';
import './About.css'; // Create a separate CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h2>About Colorx</h2>
      <p>
        Welcome to Colorx, where creativity meets color! Colorx is more than just a platform; it's your go-to resource for all things related to colors. Whether you're a designer seeking inspiration, an artist exploring new palettes, or someone who simply loves colors, Colorx has something special for you.
      </p>
      
      <div className="feature-container">
        <div className="feature">
          <div className="color-animation color-code-generator"></div>
          <h3>Color Code Generator</h3>
          <p>
            Unleash your imagination with our intuitive color code generator. Easily create vibrant color codes for your projects. From HEX to RGB and HSL, Colorx has you covered.
          </p>
        </div>
        
        <div className="feature">
          <div className="color-animation palette-generator"></div>
          <h3>Palette Generator</h3>
          <p>
            Dive into the world of palettes! Our palette generator lets you explore harmonious color combinations. Experiment, discover, and find the perfect palette that resonates with your creative vision.
          </p>
        </div>
        
        <div className="feature">
          <div className="color-animation color-info"></div>
          <h3>Color Information</h3>
          <p>
            Need details about a specific color? Find color information effortlessly. Whether you have a color code and want to know the name or vice versa, Colorx provides quick and accurate results.
          </p>
        </div>
        
        <div className="feature">
          <div className="color-animation color-library"></div>
          <h3>Color Library</h3>
          <p>
            Surf through an expansive color library filled with a diverse range of hues. Discover trending colors, historical classics, and everything in between. The possibilities are endless!
          </p>
        </div>
      </div>
      
      <p>
        But that's not all—Colorx offers a range of features to elevate your color experience. Export your favorite palettes as PNG files, copy color codes to the clipboard with a single click, and enjoy the thrill of random color code generation.
      </p>
      
      <p>
        At Colorx, we believe in making colors accessible and enjoyable for everyone. Join our vibrant community of color enthusiasts and let your creativity shine! Your journey with color starts here.
      </p>
    </div>
  );
};

export default About;
