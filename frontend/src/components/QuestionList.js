import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';

function QuestionList({ difficulty, selectedQuestion, onQuestionSelect }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetchQuestions(difficulty);
        setQuestions(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load questions');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (difficulty) {
      loadQuestions();
    }
  }, [difficulty]);

  const getDifficultyBadgeClass = (diff) => {
    switch (diff) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'hard':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Available Questions</h5>
      </div>
      <div className="list-group list-group-flush">
        {questions.length === 0 ? (
          <div className="list-group-item text-center text-muted">
            No questions available
          </div>
        ) : (
          questions.map((question) => (
            <button
              key={question._id}
              className={`list-group-item list-group-item-action question-card ${
                selectedQuestion?._id === question._id ? 'active' : ''
              }`}
              onClick={() => onQuestionSelect(question)}
            >
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h6 className="mb-1">{question.title}</h6>
                <span className={`badge difficulty-badge ${getDifficultyBadgeClass(question.difficulty)}`}>
                  {question.difficulty}
                </span>
              </div>
              <p className="mb-0 small text-muted">{question.description}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default QuestionList;
