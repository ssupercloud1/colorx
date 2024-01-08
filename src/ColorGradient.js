// ColorGradient.js
import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import domtoimage from 'dom-to-image';

const ColorGradient = () => {
  const [startColor, setStartColor] = useState('#FF5733');
  const [endColor, setEndColor] = useState('#33FF57');
  const [position, setPosition] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [gradientType, setGradientType] = useState('linear');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    const handleDocumentClick = () => {
      setShowStartPicker(false);
      setShowEndPicker(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

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
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '800px', margin: 'auto', position: 'relative' }}>
      <h2 style={{ textAlign: 'center' }}>Color Gradient</h2>
      <div id="gradient-container" style={{ position: 'relative', marginBottom: '20px', height: '300px' }}>
        <div
          style={{
            background: gradientType === 'linear'
              ? `linear-gradient(${rotation}deg, ${startColor}, ${endColor})`
              : `radial-gradient(circle, ${startColor}, ${endColor})`,
            position: 'relative',
            width: '80%',
            height: '200px',
			margin: 'auto',
          }}
        />
        {showStartPicker && (
          <div style={{ position: 'absolute', top: '180px', left: '10px' }}>
            <SketchPicker color={startColor} onChange={(color) => setStartColor(color.hex)} />
          </div>
        )}
        {showEndPicker && (
          <div style={{ position: 'absolute', top: '180px', right: '10px' }}>
            <SketchPicker color={endColor} onChange={(color) => setEndColor(color.hex)} />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '40px' }}>
        <div
          style={{
            width: '30px',
            height: '30px',
            background: startColor,
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowStartPicker(!showStartPicker);
            setShowEndPicker(false);
          }}
        />
        <div
          style={{
            width: '30px',
            height: '30px',
            background: endColor,
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowEndPicker(!showEndPicker);
            setShowStartPicker(false);
          }}
        />
      </div>
	   <div>
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
