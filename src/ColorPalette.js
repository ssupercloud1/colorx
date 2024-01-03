// ColorPalette.js
import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import './ColorPalette.css';

const ColorPalette = () => {
  const [baseColor, setBaseColor] = useState('blue'); // Set the initial base color to 'blue'
  const [shades, setShades] = useState([]);
  const [tints, setTints] = useState([]);
  const [tones, setTones] = useState([]);
  const [error, setError] = useState('');

  const generatePalette = () => {
    setError('');
    if (baseColor.trim() !== '') {
      const baseColorCode = chroma.valid(baseColor) ? chroma(baseColor).hex() : '';

      if (baseColorCode) {
        const shadeColors = chroma.scale(['black', baseColorCode]).colors(13);
        const tintColors = chroma.scale([baseColorCode, 'white']).colors(13);
        const toneColors = chroma
          .scale(['black', baseColorCode, 'white'])
          .colors(13);

        setShades(shadeColors);
        setTints(tintColors);
        setTones(toneColors);
      } else {
        setShades([]);
        setTints([]);
        setTones([]);
        setError('Invalid base color. Please enter a valid color name or HEX code.');
      }
    } else {
      setShades([]);
      setTints([]);
      setTones([]);
    }
  };

  useEffect(() => {
    generatePalette();
  }, [baseColor]);

  const handleBaseColorChange = (event) => {
    setBaseColor(event.target.value);
  };

  return (
    <div className="color-palette-container" style={{ textAlign: 'center', padding: '20px', maxWidth: '100%', margin: 'auto' }}>
      <p>
        Enter a base color (name or HEX code) to generate its shades, tints, and tones.
      </p>
      <label>
        Base Color:
        <input
          type="text"
          placeholder="Enter base color"
          value={baseColor}
          onChange={handleBaseColorChange}
        />
      </label>

      {error && <p className="error-message">{error}</p>}

      {shades.length > 0 && (
        <div className="color-palette-section">
          <h4>Shades of {baseColor.toUpperCase()}</h4>
          <div className="color-palette" style={{ justifyContent: 'center' }}>
            {shades.map((shade, index) => (
              <div key={index} className="color-palette-color" style={{ backgroundColor: shade }}>
                <span className="color-label">{shade}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tints.length > 0 && (
        <div className="color-palette-section">
          <h4>Tints of {baseColor.toUpperCase()}</h4>
          <div className="color-palette" style={{ justifyContent: 'center' }}>
            {tints.map((tint, index) => (
              <div key={index} className="color-palette-color" style={{ backgroundColor: tint }}>
                <span className="color-label">{tint}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tones.length > 0 && (
        <div className="color-palette-section">
          <h4>Tones of {baseColor.toUpperCase()}</h4>
          <div className="color-palette" style={{ justifyContent: 'center' }}>
            {tones.map((tone, index) => (
              <div key={index} className="color-palette-color" style={{ backgroundColor: tone }}>
                <span className="color-label">{tone}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
