import React from 'react';
import './404.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-error-box">
        <h1 className="not-found-h1">404</h1>
        <h2 className="not-found-h2">Page Not Found</h2>
        <p className="not-found-p">Looks like you've stumbled into a dead end. Don't worry, it happens to the best of us.</p>
        <Link to="/" className="not-found-button">Take me back to Home</Link>
      </div>

      <div className="not-found-animation-container">
        <div className="not-found-stars">
          {/* Stars will be added dynamically using JavaScript */}
        </div>
        <div className="not-found-planet"></div>
        <div className="not-found-comet">
          <div className="tail"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
