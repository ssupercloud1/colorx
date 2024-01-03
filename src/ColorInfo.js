// ColorInfo.js

import React, { useState } from 'react';
import * as fuzzball from 'fuzzball';
import ColorNames from './ColorNames';
import './ColorInfo.css';

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
        setDisplayColor('');
        setDisplayColorCode('Not Found');
        setDisplayColorName('Not Found');
      }
    } else {
      // Handle color name input
      const colorName = value.toLowerCase();
      const matchedColor = Object.keys(ColorNames).find(
        (key) => key.toLowerCase() === colorName || fuzzball.ratio(key.toLowerCase(), colorName) > 90
      );

      if (matchedColor) {
        const colorCode = ColorNames[matchedColor];
        setDisplayColor(colorCode);
        setDisplayColorCode(colorCode);
        setDisplayColorName(matchedColor);
      } else {
        setDisplayColor('');
        setDisplayColorCode('Not Found');
        setDisplayColorName('Not Found');
      }
    }
  };

  return (
    <div className="color-info-page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', padding: '10px', marginBottom: '20px', marginTop: '10px', background: '#031501', color: '#ffffff' }}>
	  Color Finder
	  </h2>

      <div className="color-info-container" style={{ width: '83.8%', maxWidth: '100%', margin: 'auto', alignItems: 'center', border: '1px solid #ccc', borderRadius: '15px', height: '320px', marginBottom: '20px' }}>
        <p style={{ textAlign: 'center', marginBottom: '10px' }}>
          Explore the details of a color by entering its name or HEX code below.
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter name or HEX code"
          style={{ width: '50%', padding: '10px' }}
        />
        {displayColor && (
          <div className="color-display" style={{ backgroundColor: displayColor }}></div>
        )}
        {displayColorCode !== 'Not Found' && displayColorName !== 'Not Found' && (
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
