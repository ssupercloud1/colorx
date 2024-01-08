// ContrastChecker.js
import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

const ContrastChecker = () => {
  const [textColor, setTextColor] = useState('#00FF00');
  const [backgroundColor, setBackgroundColor] = useState('#000435');
  const [contrastRatio, setContrastRatio] = useState(null);
  const [accessibilityLevel, setAccessibilityLevel] = useState('');

  useEffect(() => {
    const calculateContrastRatio = (foreground, background) => {
      const lum1 = calculateRelativeLuminance(foreground);
      const lum2 = calculateRelativeLuminance(background);

      const contrast = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
      return contrast.toFixed(2);
    };

    const calculateRelativeLuminance = (color) => {
      const rgb = color.match(/\w\w/g).map((hex) => parseInt(hex, 16) / 255);

      const gammaCorrected = rgb.map((val) =>
        val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
      );

      const luminance = gammaCorrected[0] * 0.2126 + gammaCorrected[1] * 0.7152 + gammaCorrected[2] * 0.0722;
      return luminance;
    };

    const getAccessibilityLevel = (contrastRatio) => {
      if (contrastRatio >= 7.0) {
        return 'AAA';
      } else if (contrastRatio >= 4.5) {
        return 'AA';
      } else {
        return 'Fail';
      }
    };

    const handleCheckContrast = () => {
      const ratio = calculateContrastRatio(textColor, backgroundColor);
      setContrastRatio(ratio);
      setAccessibilityLevel(getAccessibilityLevel(ratio));
    };

    handleCheckContrast();
  }, [textColor, backgroundColor]);

  const handleInputChange = (color, isText) => {
    isText ? setTextColor(color.hex) : setBackgroundColor(color.hex);
  };

  return (
    <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '15px' }}>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Color Contrast Checker</h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ color: '#333' }}>Text Color</label>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <SketchPicker
              color={textColor}
              onChange={(color) => handleInputChange(color, true)}
            />
            <div style={{ marginLeft: '10px' }}>
              <div style={{ color: textColor, fontWeight: 'bold' }}>{textColor}</div>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
          <label style={{ color: '#333' }}>Background Color</label>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <SketchPicker
              color={backgroundColor}
              onChange={(color) => handleInputChange(color, false)}
            />
            <div style={{ marginLeft: '10px' }}>
              <div style={{ color: backgroundColor, fontWeight: 'bold' }}>{backgroundColor}</div>
            </div>
          </div>
        </div>
      </div>
      {contrastRatio !== null && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#333' }}>Contrast Ratio: {contrastRatio}</p>
          <p style={{ color: '#333' }}>Accessibility Level: {accessibilityLevel}</p>
        </div>
      )}
      <div style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}>
        <div
          style={{
            color: textColor,
            backgroundColor: backgroundColor,
            padding: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
			maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          The sky was a deep shade of indigo as the sun began to set. The orange and red hues of the sunset were reflected in the calm waters of the lake. The trees were a vibrant shade of green, and the leaves rustled gently in the breeze. A yellow butterfly fluttered past, its wings a blur of color. The flowers in the meadow were a riot of pink, purple, and white. The world was alive with color, and it was a beautiful sight to behold.
        </div>
      </div>
    </div>
  );
};

export default ContrastChecker;
