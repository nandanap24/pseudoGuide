import React from "react";

function QuestionList({ questions, onQuestionSelect, solvedIds = [] }) {
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center p-5 border rounded bg-white">
        No challenges match your filters.
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {questions.map((q) => (
        <div key={q.id} className="card question-card border-0 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center p-4">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-1">
                <h5 className="fw-bold mb-0 text-primary">{q.title}</h5>
                {solvedIds.includes(q.id) && (
                  <span className="badge bg-success-subtle text-success border border-success-subtle px-2">
                    ✓ Solved
                  </span>
                )}
              </div>
              <div className="d-flex gap-3 small text-muted">
                <span className="text-capitalize fw-bold">{q.difficulty}</span>
                <span>Score: 10</span>
              </div>
            </div>
            <button
              className="btn btn-outline-primary px-4 fw-bold rounded-pill"
              onClick={() => onQuestionSelect(q)}
            >
              {solvedIds.includes(q.id) ? "Review" : "Solve Challenge"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
