import React, { useState, useEffect } from 'react';
import './CodeGenerator.css'; // Update the path to your CSS file
import colorNameList from 'color-name-list';

const CodeGenerator = () => {
  const [color, setColor] = useState('#007CE5');
  const [inputValue, setInputValue] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [colorFormat, setColorFormat] = useState('HEX');

  useEffect(() => {
    const allColorNames = {};
    colorNameList.forEach((colorObj) => {
      const name = colorObj.name.toLowerCase();
      const code = colorObj.hex.toLowerCase();
      allColorNames[name] = code;
    });
    setColorNames(allColorNames);
  }, []);

  const [colorNames, setColorNames] = useState({});

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const isColorCode = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(value);
    if (isColorCode) {
      setColor(value);
      setDisplayMessage('');
    } else {
      const colorCode = colorNames[value.toLowerCase()];
      if (colorCode) {
        setColor(colorCode);
        setDisplayMessage('');
      } else {
        setColor('#000000'); // Set color for "Unknown" to black
        setDisplayMessage('');
      }
    }
  };

  const handleColorNameChange = () => {
    const isColorCode = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(inputValue);
    if (!isColorCode) {
      const colorCode = colorNames[inputValue.toLowerCase()];
      if (colorCode) {
        setColor(colorCode);
        setDisplayMessage('');
      } else {
        setColor('#000000'); // Set color for "Unknown" to black
        setDisplayMessage('');
      }
    }
  };

  const handleRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
    setDisplayMessage('');
  };

  const handleCopyColor = () => {
    navigator.clipboard.writeText(color);
  };

  const handleChangeColorFormat = (format) => {
    setColorFormat(format);
  };

  return (
    <div className="colorx-container">
      {/* Animations Container */}
      <div className="color-animations-container">
        <div className="color-wheel-animation"></div>
      </div>

      {/* Code Generator Container */}
      <div className="color-generator">
        <h2>Code Generator</h2>
        <div>
          <label>
            <input
              type="text"
              placeholder={`Enter color code or name (${colorFormat})`}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleColorNameChange}
            />
          </label>
          <div>
            <div className="color-display" style={{ backgroundColor: color }}></div>
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <p>
            {displayMessage && `${displayMessage} `}
            (HEX: {color}) (RGB: {hexToRgb(color).join(', ')}) (HSL: {hexToHsl(color).join(', ')})
          </p>
          <div>
            <label>
              <input
                type="radio"
                name="colorFormat"
                value="HEX"
                checked={colorFormat === 'HEX'}
                onChange={() => handleChangeColorFormat('HEX')}
              />
              HEX
            </label>
            <label>
              <input
                type="radio"
                name="colorFormat"
                value="RGB"
                checked={colorFormat === 'RGB'}
                onChange={() => handleChangeColorFormat('RGB')}
              />
              RGB
            </label>
            <label>
              <input
                type="radio"
                name="colorFormat"
                value="HSL"
                checked={colorFormat === 'HSL'}
                onChange={() => handleChangeColorFormat('HSL')}
              />
              HSL
            </label>
          </div>
          <button onClick={handleRandomColor}>Random Color</button>
          <button onClick={handleCopyColor}>Copy Color</button>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert HEX to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

// Helper function to convert HEX to HSL
function hexToHsl(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) => c / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default:
        // Handle unexpected values
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [h, s, l];
}

export default CodeGenerator;
