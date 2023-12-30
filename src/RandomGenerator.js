import React, { useState } from "react";
import chroma from "chroma-js";

function RandomGenerator() {
  const [color, setColor] = useState("#ffffff");

  const generateColor = () => {
    const randomColor = chroma.random();
    setColor(randomColor.hex());
  };

  return (
    <div>
      <h2>Random Color Generator</h2>
      <button onClick={generateColor}>Generate Random Color</button>
      <div style={{ backgroundColor: color, width: "50px", height: "50px" }}></div>
    </div>
  );
}

export default RandomGenerator;
