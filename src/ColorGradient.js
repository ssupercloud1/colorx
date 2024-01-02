// ColorGradient.js
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import domtoimage from 'dom-to-image';

const ColorGradient = () => {
  const [startColor, setStartColor] = useState('#FF5733');
  const [endColor, setEndColor] = useState('#33FF57');
  const [position, setPosition] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [gradientType, setGradientType] = useState('linear');

  const handleExportPNG = () => {
    const gradientContainer = document.getElementById('gradient-container');
    if (gradientContainer) {
      domtoimage
        .toPng(gradientContainer)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'color_gradient.png';
          link.click();
        })
        .catch((error) => console.error('Error exporting PNG:', error));
    }
  };

  return (
    <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '800px', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center' }}>Color Gradient</h3>
      <div id="gradient-container" style={{ position: 'relative', marginBottom: '30px' }}>
        <div
          style={{
            background: gradientType === 'linear'
              ? `linear-gradient(${rotation}deg, ${startColor}, ${endColor})`
              : `radial-gradient(circle, ${startColor}, ${endColor})`,
            position: 'absolute',
            width: '100%',
            height: '200px',
          }}
        />
      </div>
      <div>
        <label>
          Start Color:
          <SketchPicker color={startColor} onChange={(color) => setStartColor(color.hex)} />
        </label>
        <label>
          End Color:
          <SketchPicker color={endColor} onChange={(color) => setEndColor(color.hex)} />
        </label>
        <label>
          Position:
          <input type="range" min="0" max="100" value={position} onChange={(e) => setPosition(e.target.value)} />
          {position}%
        </label>
        <label>
          Rotation:
          <input type="range" min="0" max="360" value={rotation} onChange={(e) => setRotation(e.target.value)} />
          {rotation}°
        </label>
        <label>
          Gradient Type:
          <select value={gradientType} onChange={(e) => setGradientType(e.target.value)}>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </label>
      </div>
      <button style={{ marginBottom: '40px', marginTop: '20px', padding: '5px', background: 'blue', color: 'white' }} onClick={handleExportPNG}>
        Export
      </button>
    </div>
  );
};

export default ColorGradient;
