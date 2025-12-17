import React from 'react';

function ResultViewer({ result }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'correct':
        return 'correct-status';
      case 'partial':
        return 'partial-status';
      case 'incorrect':
        return 'incorrect-status';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct':
        return '✓';
      case 'partial':
        return '⚠';
      case 'incorrect':
        return '✗';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'correct':
        return 'Correct';
      case 'partial':
        return 'Partially Correct';
      case 'incorrect':
        return 'Incorrect';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Results</h5>
      </div>
      <div className="card-body">
        <div className={`alert ${getStatusClass(result.status)} fw-bold`} role="alert">
          {getStatusIcon(result.status)} {getStatusText(result.status)}
        </div>

        {result.status === 'correct' ? (
          <div className="alert alert-success">
            <strong>Excellent!</strong> Your pseudocode is correct.
          </div>
        ) : (
          <>
            <h6 className="mb-3">Issues Found:</h6>
            {result.errors && result.errors.length > 0 ? (
              <div className="error-list">
                {result.errors.map((error, index) => (
                  <div key={index} className="error-line mb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <strong className="text-danger">
                        Line {error.lineNumber}
                      </strong>
                    </div>
                    
                    {error.received && (
                      <div className="mt-2">
                        <small className="text-muted d-block">Your code:</small>
                        <code className="d-block bg-light p-2 rounded">
                          {error.received}
                        </code>
                      </div>
                    )}
                    
                    {error.expected && error.expected.length > 0 && (
                      <div className="mt-2">
                        <small className="text-muted d-block">Expected:</small>
                        {error.expected.map((exp, idx) => (
                          <code key={idx} className="d-block bg-light p-2 rounded mb-1">
                            {exp}
                          </code>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <small className="text-danger">
                        <strong>Reason:</strong> {error.reason}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
                No specific errors to display.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResultViewer;
