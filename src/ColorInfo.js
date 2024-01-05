import React, { useState } from 'react';
import * as fuzzball from 'fuzzball';
import ColorNames from './ColorNames';
import { SketchPicker } from 'react-color';
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

  const handleColorChange = (color) => {
    setDisplayColor(color.hex);
    setDisplayColorCode(color.hex);
    setDisplayColorName('Custom Color');
  };

  // Helper functions for converting color formats

  const convertHexToHSV = (hex) => {
    hex = hex.substring(1); // remove #
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h, s, v;

    if (delta === 0) h = 0;
    else if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    s = max === 0 ? 0 : Math.round((delta / max) * 100);
    v = Math.round((max / 255) * 100);

    return `H: ${h}, S: ${s}%, V: ${v}%`;
  };

  const convertHexToHSL = (hex) => {
    hex = hex.substring(1); // remove #
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h, s, l;

    l = (max + min) / 2;

    if (delta === 0) h = 0;
    else if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    s = delta === 0 ? 0 : Math.round((delta / (1 - Math.abs(2 * l - 1))) * 100);

    return `H: ${h}, S: ${s}%, L: ${l}%`;
  };

  const convertHexToCMYK = (hex) => {
    hex = hex.substring(1); // remove #
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    const black = Math.min(1 - red, 1 - green, 1 - blue);
    const cyan = (1 - red - black) / (1 - black);
    const magenta = (1 - green - black) / (1 - black);
    const yellow = (1 - blue - black) / (1 - black);

    return `C: ${Math.round(cyan * 100)}%, M: ${Math.round(magenta * 100)}%, Y: ${Math.round(yellow * 100)}%, K: ${Math.round(black * 100)}%`;
  };

  return (
    <div className="color-info-page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', padding: '10px', marginBottom: '20px', marginTop: '10px' }}>
        Generate Color Codes Easily
      </h2>

      <div className="color-info-container" style={{ width: '80%', maxWidth: '100%', margin: 'auto', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', borderRadius: '15px', height: '550px', marginBottom: '20px' }}>
        <p style={{ textAlign: 'center', marginBottom: '10px' }}>
          Explore the details of a color by entering its name or HEX code. You may also use a color picker.
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter name or HEX code"
          style={{ width: '50%', padding: '10px' }}
        />
        <SketchPicker
          color={displayColor}
          onChange={handleColorChange}
        />
        {displayColorCode !== 'Not Found' && displayColorName !== 'Not Found' && (
          <p>
            {displayColorName && `Name: ${displayColorName} `}
            {displayColorCode && `Code: ${displayColorCode}`}
            {displayColorCode && (
              <span>
                <br />
                {`RGB: ${displayColorCode.substring(1).match(/.{2}/g).map((value) => parseInt(value, 16)).join(', ')}`}
                <br />
                {`HSV: ${convertHexToHSV(displayColorCode)}`}
                <br />
                {`HSL: ${convertHexToHSL(displayColorCode)}`}
                <br />
                {`CMYK: ${convertHexToCMYK(displayColorCode)}`}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default ColorInfo;
