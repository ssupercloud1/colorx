// ColorInfo.js

import React, { useState } from 'react';
import ColorNames from './ColorNames';
import './ColorInfo.css'; // Ensure this import points to your CSS file

const ColorInfo = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [displayColorCode, setDisplayColorCode] = useState('');
  const [displayColorName, setDisplayColorName] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    setInputValue(value);

    if (value.startsWith('#')) {
      // Handle color code input
      const colorCode = value.toUpperCase();
      const colorName = Object.keys(ColorNames).find(
        (key) => ColorNames[key].toLowerCase() === colorCode.toLowerCase()
      );

      if (colorName) {
        setDisplayColor(colorCode);
        setDisplayColorCode(colorCode);
        setDisplayColorName(colorName);
      } else {
        setDisplayColor(''); // Clear display for invalid color code
        setDisplayColorCode('Not Found');
        setDisplayColorName('Not Found');
      }
    } else {
      // Handle color name input
      const colorName = value.toLowerCase();
      const colorCode = ColorNames[colorName];
      if (colorCode) {
        setDisplayColor(colorCode);
        setDisplayColorCode(colorCode);
        setDisplayColorName(colorName);
      } else {
        setDisplayColor(''); // Clear display for invalid color name
        setDisplayColorCode('Not Found');
        setDisplayColorName('Not Found');
      }
    }
  };

  return (
    <div className="color-info-page-container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {/* Color Animations Container */}
      <div className="color-animations-container">
        <div className="color-gradient-animation"></div>
      </div>

      {/* Color Info Container */}
      <div className="color-info-container">
        <h2 style={{ textAlign: 'center' }}>Color Information</h2>
        <label>
          Enter color name or code:
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter name or HEX code"
          />
        </label>
        {displayColor && (
          <div className="color-display" style={{ backgroundColor: displayColor }}></div>
        )}
        {displayColorCode !== '' && displayColorName !== '' && (
          <p>
            {displayColorName && `Name: ${displayColorName} `}
            {displayColorCode && `Code: ${displayColorCode}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default ColorInfo;
