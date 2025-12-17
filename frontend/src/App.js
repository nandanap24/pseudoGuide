import React, { useState } from 'react';
import LandingPage from './components/LandingPage'; // Import the new LandingPage component
import DifficultySelector from './components/DifficultySelector';
import QuestionList from './components/QuestionList';
import CodeEditor from './components/CodeEditor';
import ResultViewer from './components/ResultViewer';

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true); // New state for landing page visibility
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleStartPractice = () => {
    setShowLandingPage(false); // Hide landing page and show main content
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setSelectedQuestion(null);
    setSubmissionResult(null);
  };

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setSubmissionResult(null);
  };

  const handleSubmissionResult = (result) => {
    setSubmissionResult(result);
  };

  const handleReset = () => {
    setSelectedQuestion(null);
    setSubmissionResult(null);
  };

  return (
    <div className="App">
      {showLandingPage ? (
        <LandingPage onStartPractice={handleStartPractice} />
      ) : (
        <>
          <nav className="navbar navbar-dark bg-primary mb-4">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">pseudoGuide</span>
            </div>
          </nav>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <DifficultySelector
                  selectedDifficulty={selectedDifficulty}
                  onDifficultyChange={handleDifficultyChange}
                />
              </div>
            </div>

            {selectedDifficulty && (
              <div className="row mt-4">
                <div className="col-md-4">
                  <QuestionList
                    difficulty={selectedDifficulty}
                    selectedQuestion={selectedQuestion}
                    onQuestionSelect={handleQuestionSelect}
                  />
                </div>

                <div className="col-md-8">
                  {selectedQuestion && (
                    <>
                      <CodeEditor
                        question={selectedQuestion}
                        onSubmissionResult={handleSubmissionResult}
                        onReset={handleReset}
                      />
                      
                      {submissionResult && (
                        <ResultViewer result={submissionResult} />
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
