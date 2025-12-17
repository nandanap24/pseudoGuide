import React from 'react';

function DifficultySelector({ selectedDifficulty, onDifficultyChange }) {
  const difficulties = [
    { value: 'easy', label: 'Easy', variant: 'success' },
    { value: 'medium', label: 'Medium', variant: 'warning' },
    { value: 'hard', label: 'Hard', variant: 'danger' },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Select Difficulty Level</h5>
        <div className="d-grid gap-2 d-md-flex">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              className={`btn btn-${difficulty.variant} ${
                selectedDifficulty === difficulty.value ? 'active' : ''
              }`}
              onClick={() => onDifficultyChange(difficulty.value)}
            >
              {difficulty.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DifficultySelector;
