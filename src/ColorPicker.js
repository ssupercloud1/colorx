import React, { useState } from 'react';
import { RgbColorPicker } from 'react-colorful';
import { findColorCode, findColor } from './ColorConverter';

function ColorPicker() {
  const [color, setColor] = useState('#ffffff');
  const [code, setCode] = useState('');

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setCode(findColorCode(newColor).join(', '));
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setColor(findColor(newCode.split(', ')));
  };

  return (
    <div>
      <RgbColorPicker color={color} onChange={handleColorChange} />
      <div>
        <label htmlFor="color-code">Color Code:</label>
        <input
          type="text"
          id="color-code"
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ColorPicker;
