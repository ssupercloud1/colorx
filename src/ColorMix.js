import React from 'react';
import { saveAs } from 'file-saver';
import './ColorMix.css';  // Import the CSS file

class ColorMix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [
        { hex: "#ff0000", ratio: 50 },
        { hex: "#0000ff", ratio: 50 },
      ],
      currentColor: "#ff0000",
      finalColor: null,
    };
  }

  handleColorChange = (event) => {
    this.setState({ currentColor: event.target.value });
  };

  handleAddColor = () => {
    const { colors, currentColor } = this.state;
    const remainingRatio = 100 - colors.reduce((sum, color) => sum + color.ratio, 0);
    const ratio = remainingRatio > 0 ? remainingRatio : 0;
    this.setState({ colors: [...colors, { hex: currentColor, ratio }] });
  };

  handleRemoveColor = (index) => {
    const { colors } = this.state;
    this.setState({ colors: colors.filter((_, i) => i !== index) });
  };

  handleAdjustRatio = (index, adjustment) => {
    const { colors } = this.state;
    const currentRatio = colors[index].ratio;
    const newRatio = currentRatio + adjustment;
    if (newRatio >= 0) {
      const totalRatio = colors.reduce((sum, color, i) => (i === index ? sum + newRatio : sum + color.ratio), 0);
      if (totalRatio <= 100) {
        colors[index].ratio = newRatio;
        this.setState({ colors });
      }
    }
  };

  handleMixColors = () => {
    const { colors } = this.state;
    if (colors.length >= 2) {
      const finalColor = this.mixColors(colors);
      this.setState({ finalColor });
    }
  };

  mixColors = (colors) => {
    const r = colors.reduce((sum, color) => sum + parseInt(color.hex.slice(1, 3), 16) * color.ratio, 0) / 100;
    const g = colors.reduce((sum, color) => sum + parseInt(color.hex.slice(3, 5), 16) * color.ratio, 0) / 100;
    const b = colors.reduce((sum, color) => sum + parseInt(color.hex.slice(5, 7), 16) * color.ratio, 0) / 100;
    const hex = "#" + Math.round(r).toString(16).padStart(2, "0") + Math.round(g).toString(16).padStart(2, "0") + Math.round(b).toString(16).padStart(2, "0");
    const name = this.getColorName(hex);
    return { hex, name };
  };

  getColorName = (hex) => {
    switch (hex) {
      case "#ffff00":
        return "Yellow";
      case "#ff0000":
        return "Red";
      case "#ff00ff":
        return "Magenta";
      case "#0000ff":
        return "Blue";
      case "#00ffff":
        return "Cyan";
      case "#00ff00":
        return "Green";
      case "#ffffff":
        return "White";
      case "#000000":
        return "Black";
      default:
        return "Custom Color";
    }
  };

  handleReset = () => {
    this.setState({ colors: [], currentColor: "#ffff00", finalColor: null });
  };

  handleExport = () => {
    const { finalColor } = this.state;
    if (finalColor) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;
      ctx.fillStyle = finalColor.hex;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        saveAs(blob, `final_color.png`);
      });
    }
  };

  render() {
    const { colors, currentColor, finalColor } = this.state;

    return (
      <div style={{ textAlign: 'justified', padding: '20px', maxWidth: '800px', margin: 'auto', border: '1px solid #ccc', borderRadius: '7px' }}>
        <h2 style={{ textAlign: 'center' }}>Color Mixer</h2>
        <p>
          This is an online color mixing tool that allows you to experiment with different color combinations, mixtures, and shades until you find the perfect palette for your artwork or design project.
		</p>
		<p>
		  The color mixer is versatile and can be used for a variety of applications, including soap making, cooking, wall painting, modeling, learning color theory, and more.
        </p>
        <div>
          <input
            type="color"
            id="color-picker"
            value={currentColor}
            onChange={this.handleColorChange}
          />
          <button onClick={this.handleAddColor}>Add Color</button>
          <button onClick={this.handleMixColors}>Mix Colors</button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
          {colors.map((color, index) => (
            <div key={index} style={{ margin: "0px", textAlign: "center", height: "220px" }}>
              <div
                style={{
                  backgroundColor: color.hex,
                  height: "100px",
                  width: "80px",
                  display: "inline-block",
                }}
              ></div>
              <div style={{ fontSize: "12px", margin: "5px" }}>{color.hex}</div>
              <button onClick={() => this.handleAdjustRatio(index, -10)}>-</button>
              <div style={{ fontSize: "14px" }}>{color.ratio}%</div>
              <button onClick={() => this.handleAdjustRatio(index, 10)}>+</button>
              <button onClick={() => this.handleRemoveColor(index)}>R</button>
            </div>
          ))}
        </div>
        {finalColor && (
          <div>
            <div style={{ margin: "10px" }}>
              <div style={{ margin: "1px", textAlign: "center", height: "180px" }}>
                <div
                  style={{
                    backgroundColor: finalColor.hex,
                    height: "100px",
                    width: "250px",
                    display: "inline-block",
                  }}
                ></div>
                <div style={{ fontSize: "12px", margin: "5px" }}>{finalColor.hex}</div>
                <div style={{ fontSize: "14px" }}>{finalColor.name}</div>
              </div>
            </div>
            <button onClick={this.handleExport}>Export</button>
          </div>
        )}
      </div>
    );
  }
}

export default ColorMix;
