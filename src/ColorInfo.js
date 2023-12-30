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
    <div className="color-info-page-container">
      {/* Color Info Container */}
      <div className="color-info-container">
        <h2 style={{ textAlign: 'center' }}>Color Information</h2>
        <p style={{ textAlign: 'center', marginBottom: '10px' }}>
          Explore the details of a color by entering its name or HEX code below.
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter name or HEX code"
          style={{ width: '100%', padding: '8px' }}
        />
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
