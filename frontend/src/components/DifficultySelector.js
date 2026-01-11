import React from "react";

function DifficultySelector({ selectedDifficulties, onDifficultyChange }) {
  const difficulties = ["easy", "medium", "hard"];

  const handleToggle = (level) => {
    // HackerRank Logic: If already in the list, remove it. If not, add it.
    if (selectedDifficulties.includes(level)) {
      onDifficultyChange(selectedDifficulties.filter((d) => d !== level));
    } else {
      onDifficultyChange([...selectedDifficulties, level]);
    }
  };

  return (
    <div className="d-flex flex-column gap-1">
      {difficulties.map((level) => (
        <div
          key={level}
          className={`sidebar-filter-item ${
            selectedDifficulties.includes(level) ? "active" : ""
          }`}
          onClick={() => handleToggle(level)}
        >
          {/* Custom checkbox/radio circle */}
          <div
            className={`filter-radio me-3 ${
              selectedDifficulties.includes(level) ? "checked" : ""
            }`}
          ></div>
          <span className="text-capitalize fw-semibold">{level}</span>
        </div>
      ))}
    </div>
  );
}

// THIS LINE IS ESSENTIAL TO FIX THE "Attempted import error"
export default DifficultySelector;
