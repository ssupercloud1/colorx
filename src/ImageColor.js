import React, { useState, useEffect } from 'react';
import { extractColors } from 'extract-colors';
import FileSaver from 'file-saver';
import './ImageColor.css';
import videoFile from './smart-colors.mp4';

function ImageColor() {
  const [colors, setColors] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setShowButtons(colors.length > 0);
  }, [colors]);

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        extractColors(image).then((colors) => {
          setColors(colors);
        });
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportPalette = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');

    colors.forEach((color, index) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(index * 60, 0, 60, 50);
    });

    canvas.toBlob((blob) => {
      FileSaver.saveAs(blob, 'color_palette.png');
    });
  };

  const handleReset = () => {
    setColors([]);
    setUploadedImage(null);
    setShowButtons(false);

    // Clear the file input value
    const fileInput = document.getElementById('image-upload-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

return (
    <div className="image-color-container">
	  <h2 style={{ textAlign: 'center' }}>Unlock the Colors Within Your Images</h2>
      <video autoPlay controls loop width="100%">
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>
      Unleash the vibrant beauty hidden within your photos and files with Colorx. Effortlessly extract stunning color palettes, uncover captivating harmonies and gradients, and explore a limitless spectrum of creative possibilities with just a single upload.
      </p>

      <p>
      Let Colorx be your guide to harmonious color combinations that elevate your designs, craft unique brand aesthetics that resonate with your audience, and inspire captivating artwork that reflects your unique style.
      </p>

      <p>
      Start exploring boundless color possibilities today. Upload now and create with confidence.
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e.target.files[0])}
        className="image-color-input"
        placeholder="Upload image"
        id="image-upload-input"
      />
      {uploadedImage && (
        <div className="uploaded-image-container">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="uploaded-image"
          />
        </div>
      )}

      <div className="color-palette">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-box"
            style={{
              backgroundColor: color.hex,
              width: '50px',
              height: '100px',
              cursor: 'pointer',
              marginRight: '0px',
              margin: 'auto',
              marginBottom: '50px',
            }}
          >
            <span className="color-label">{color.hex}</span>
          </div>
        ))}
      </div>

      {showButtons && (
        <div className="button-container" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <button onClick={handleExportPalette} style={{ backgroundColor: 'green' }}>
            Export
          </button>
          <button onClick={handleReset} style={{ backgroundColor: 'red' }}>
            Reset
          </button>
        </div>
      )}
      <div className="extra-space-below-buttons"></div>
    </div>
  );
}

export default ImageColor;
