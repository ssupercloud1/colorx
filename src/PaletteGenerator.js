import React, { useState, useEffect, useRef } from 'react';
import ColorNames from './ColorNames';
import './PaletteGenerator.css';
import chroma from 'chroma-js';
import domtoimage from 'dom-to-image';

const PaletteGenerator = () => {
  const [paletteColors, setPaletteColors] = useState([]);
  const [numColors, setNumColors] = useState(5);
  const [manualColors, setManualColors] = useState('');
  const paletteRef = useRef(null);

  useEffect(() => {
    generatePalette();
  }, [numColors]);

  const generatePalette = () => {
    if (manualColors.trim() !== '') {
      const enteredColors = manualColors.split(',').map((color) => color.trim());
      setPaletteColors(
        enteredColors.map((color) => {
          const colorCode = ColorNames[color.toLowerCase()];
          return colorCode ? [color, chroma(colorCode).hex()] : null;
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
  };

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
    <div className="palette-generator-container">
      <h2 style={{ textAlign: 'center' }}>Palette Generator</h2>
	  <p>With Colorx, you can generate a color palette by simply entering the number of colors you want and hitting the ‘Generate Palette’ button. Most importantly, you can easily download your palette as a PNG file.
	  </p>
      <div className="palette-options">
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
          Manual Colors (comma-separated):
          <input
            type="text"
            placeholder="Enter color names"
            value={manualColors}
            onChange={handleManualColorsChange}
          />
        </label>
        <button onClick={handleGeneratePalette}>Generate Palette</button>
        <button onClick={handleExportPNG}>Export as PNG</button>
      </div>
      <div className="palette" ref={paletteRef}>
        {paletteColors.map(([, colorCode]) => (
          <div key={colorCode} className="palette-color">
            <div className="color-display" style={{ backgroundColor: colorCode, height: '200px', width: '60px', border:'none', marginBottom: '0px' }}></div>
            <div>{colorCode}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteGenerator;
