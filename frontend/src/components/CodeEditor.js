import React, { useState, useEffect } from 'react';
import { checkPseudocode } from '../services/api';

function CodeEditor({ question, onSubmissionResult, onReset }) {
  const [userCode, setUserCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserCode('');
    setError(null);
  }, [question]);

  const handleSubmit = async () => {
    if (!userCode.trim()) {
      setError('Please enter some pseudocode before submitting');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = await checkPseudocode(question._id, userCode);
      onSubmissionResult(result);
    } catch (err) {
      setError(err.message || 'Failed to check pseudocode');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setUserCode('');
    setError(null);
    onReset();
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="mb-0">{question.title}</h5>
      </div>
      <div className="card-body">
        <p className="text-muted">{question.description}</p>
        
        <div className="mb-3">
          <label htmlFor="codeEditor" className="form-label fw-bold">
            Your Pseudocode:
          </label>
          <textarea
            id="codeEditor"
            className="form-control code-editor"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="START&#10;READ n&#10;..."
            disabled={submitting}
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={submitting || !userCode.trim()}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Checking...
              </>
            ) : (
              'Submit'
            )}
          </button>
          
          <button
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={submitting}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
