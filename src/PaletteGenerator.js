// PaletteGenerator.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ColorNames from './ColorNames';
import './PaletteGenerator.css';
import chroma from 'chroma-js';
import domtoimage from 'dom-to-image';
import GradientPalette from './GradientPalette';  // Import GradientPalette
import ColorPalette from './ColorPalette';
import { Link } from 'react-router-dom';

const PaletteGenerator = () => {
  const [paletteColors, setPaletteColors] = useState([]);
  const [numColors, setNumColors] = useState(5);
  const [manualColors, setManualColors] = useState('');
  const paletteRef = useRef(null);

  const generatePalette = useCallback(() => {
    if (manualColors.trim() !== '') {
      const enteredColors = manualColors.split(',').map((color) => color.trim());
      setPaletteColors(
        enteredColors.map((color) => {
          const colorName = Object.keys(ColorNames).find((name) => name.toLowerCase() === color.toLowerCase());
          const colorCode = colorName ? ColorNames[colorName] : null;
          return colorCode ? [colorName, chroma(colorCode).hex()] : null;
        }).filter(Boolean)
      );
    } else {
      const allColorEntries = Object.entries(ColorNames);
      const shuffledColors = shuffleArray(allColorEntries);
      const selectedColors = shuffledColors.slice(0, numColors);

      const adjustedColors = selectedColors.map(([_, colorCode]) => [
        null, // No color name
        chroma(colorCode).saturate(2).darken(0.5).hex(),
      ]);

      setPaletteColors(adjustedColors);
    }
  }, [manualColors, numColors]);

  useEffect(() => {
    generatePalette();
  }, [numColors, generatePalette]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleNumColorsChange = (event) => {
    const newNumColors = parseInt(event.target.value, 10);
    setNumColors(newNumColors);
  };

  const handleManualColorsChange = (event) => {
    setManualColors(event.target.value);
  };

  const handleGeneratePalette = () => {
    generatePalette();
  };

  const handleExportPNG = () => {
    domtoimage
      .toPng(paletteRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'palette.png';
        link.click();
      })
      .catch((error) => console.error('Error exporting PNG:', error));
  };

  return (
    <>
      <div className="palette-generator-container">
        <div>
          <h2 style={{ textAlign: 'center' }}>Palette Generator</h2>
          <p>
            Here, you're able to easily generate random color palettes (with a variety of colors), shades, tints, tones and gradient palettes.
          </p>
        </div>

        <div className="palette-options" style={{ padding: '5px', marginTop: '5px', marginBottom: '5px' }}>
          <label>
            Number of Colors:
            <input
              type="number"
              min="1"
              max={Object.keys(ColorNames).length}
              value={numColors}
              onChange={handleNumColorsChange}
            />
          </label>
          <label>
            Manual:
            <input
              type="text"
              placeholder="Enter color names"
              value={manualColors}
              onChange={handleManualColorsChange}
            />
          </label>
          <button onClick={handleGeneratePalette} style={{ padding: '5px', marginTop: '5px', marginLeft: '10px', marginRight: '5px', marginBottom: '5px', background: 'green', color: 'white' }}>Generate</button>
          <button onClick={handleExportPNG} style={{ padding: '5px', marginTop: '5px', marginBottom: '5px', background: 'blue', color: 'white' }}>Export</button>
        </div>

        <div className="palette" ref={paletteRef} style={{ justifyContent: 'center', marginBottom: '20px' }}>
          {paletteColors.map(([_, colorCode]) => (
            <div key={colorCode} className="palette-color">
              <div className="color-display" style={{ backgroundColor: colorCode, height: '200px', width: '50px', border: 'none', marginBottom: '0px' }}></div>
              <div>{colorCode}</div>
            </div>
          ))}
        </div>

        <ColorPalette />

        {/* Display the gradient palette */}
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        </div>
        <div className="gradient-palette-container">
          <GradientPalette />
        </div>
      </div>
    </>
  );
};

export default PaletteGenerator;
