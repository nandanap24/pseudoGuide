import React from 'react';

function LandingPage({ onStartPractice }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-3 mb-4">pseudoGuide</h1>
      <button 
        className="btn btn-primary btn-lg"
        onClick={onStartPractice}
      >
        Let's Practice
      </button>
    </div>
  );
}

export default LandingPage;