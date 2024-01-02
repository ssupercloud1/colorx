import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';

const GradientPalette = () => {
  const [startColor, setStartColor] = useState('#FF5733');
  const [endColor, setEndColor] = useState('#33FF57');
  const [numSteps, setNumSteps] = useState(5);
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    if (startColor !== '#FF5733' || endColor !== '#33FF57' || numSteps !== 5) {
      generatePalette();
    } else {
      // Set default palette based on initial colors
      setPalette(chroma
        .scale([chroma(startColor).hex(), chroma(endColor).hex()])
        .colors(numSteps));
    }
  }, [startColor, endColor, numSteps]);

  const generatePalette = () => {
    try {
      const colorScale = chroma
        .scale([chroma(startColor).hex(), chroma(endColor).hex()])
        .colors(numSteps);
      setPalette(colorScale);
    } catch (error) {
      console.error('Error creating color scale:', error);
      setPalette(['#000', '#fff']);
    }
  };

  const handleStartColorChange = (event) => {
    setStartColor(event.target.value);
  };

  const handleEndColorChange = (event) => {
    setEndColor(event.target.value);
  };

  const handleNumStepsChange = (event) => {
    setNumSteps(parseInt(event.target.value, 10));
  };

  return (
    <div style={{ height: '300px', padding: '20px', marginBottom: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Gradient Palette</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>
          Start Color:
          <input type="color" value={startColor} onChange={handleStartColorChange} />
        </label>
        <label style={{ marginRight: '10px' }}>
          End Color:
          <input type="color" value={endColor} onChange={handleEndColorChange} />
        </label>
        <label>
          Number of Steps:
          <input type="number" min="1" value={numSteps} onChange={handleNumStepsChange} />
        </label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {palette.map((color, index) => (
          <div key={index} style={{ backgroundColor: color, width: '80%', height: '100px', marginTop: '20px' }}></div>
        ))}
      </div>
    </div>
  );
};

export default GradientPalette;
