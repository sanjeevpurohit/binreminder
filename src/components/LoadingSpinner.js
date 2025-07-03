import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-icon">🗑️</div>
        <h2>Loading Bin Collection Data...</h2>
        <p>Please wait while we load the collection schedules</p>
        <div className="spinner-animation"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;