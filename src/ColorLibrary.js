import React, { useState, useEffect } from 'react';
import ColorNames from './ColorNames';
import './ColorLibrary.css';

const ColorLibrary = () => {
  const [sortedColors, setSortedColors] = useState([]);
  const [sortOrder, setSortOrder] = useState('ascending');
  const [visibleColors, setVisibleColors] = useState(20);

  useEffect(() => {
    const sortColorEntries = (entries) => {
      return entries.sort((a, b) => {
        const nameA = a[0].toLowerCase();
        const nameB = b[0].toLowerCase();

        if (sortOrder === 'ascending') {
          return nameA.localeCompare(nameB);
        } else if (sortOrder === 'descending') {
          return nameB.localeCompare(nameA);
        } else {
          return Math.random() - 0.5; // Random order
        }
      });
    };

    const colorEntries = Object.entries(ColorNames);
    const sortedEntries = sortColorEntries(colorEntries);
    setSortedColors(sortedEntries);
  }, [sortOrder]);

  const handleSortOrderChange = (newOrder) => {
    setSortOrder(newOrder);
    setVisibleColors(20); // Reset visible colors when sorting order changes
  };

  const handleMoreButtonClick = () => {
    setVisibleColors((prevVisibleColors) => prevVisibleColors + 20);
  };

  const displayColors = sortedColors.slice(0, visibleColors);

  return (
    <div className="color-library-container" style={{ justifyContent: 'center', maxWidth: '90%', margin: 'auto', padding: '20px', overflowX: 'auto', borderRadius: '5px', border: '1px solid #ccc' }}>
      <h2 style={{ textAlign: 'center' }}>Color Library</h2>
      <div>
        <label>
          Sort By:
          <select onChange={(e) => handleSortOrderChange(e.target.value)}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="random">Random</option>
          </select>
        </label>
      </div>
      <div className="color-rows">
        {displayColors.map(([colorName, colorCode]) => (
          <div key={colorCode} className="color-item">
            <div className="color-display" style={{ backgroundColor: colorCode }}></div>
            <p>{colorName}</p>
            <p>{colorCode}</p>
          </div>
        ))}
      </div>
      {visibleColors < sortedColors.length ? (
        <button onClick={handleMoreButtonClick} style={{ marginTop: '10px' }}>Load More Colors</button>
      ) : (
        <p style={{ textAlign: 'right' }}>No More Colors</p>
      )}
    </div>
  );
};

export default ColorLibrary;
