import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import DifficultySelector from "./components/DifficultySelector";
import QuestionList from "./components/QuestionList";
import CodeEditor from "./components/CodeEditor";
import ResultViewer from "./components/ResultViewer";
import { fetchQuestions } from "./services/api";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [solvedIds, setSolvedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchQuestions(selectedDifficulties);
        setQuestions(response.data || response || []);
      } catch (err) {
        console.error(err);
      }
    };
    if (!showLandingPage) loadData();
  }, [selectedDifficulties, showLandingPage]);

  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (!id) setSelectedQuestion(null);
      else if (questions.length > 0) {
        const found = questions.find((q) => q.id === Number(id));
        setSelectedQuestion(found || null);
      }
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, [questions]);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setSubmissionResult(null);
    window.history.pushState({ id: question.id }, "", `?id=${question.id}`);
  };

  const handleReset = () => {
    setSelectedQuestion(null);
    setSubmissionResult(null);
    window.history.pushState({}, "", window.location.pathname);
  };

  const goToLandingPage = () => {
    handleReset();
    setShowLandingPage(true);
  };

  const onNewSubmissionResult = (result) => {
    setSubmissionResult(result);
    if (result.status === "correct" && selectedQuestion) {
      if (!solvedIds.includes(selectedQuestion.id)) {
        setSolvedIds([...solvedIds, selectedQuestion.id]);
      }
    }
  };

  const filteredQuestions = questions.filter((q) => {
    if (statusFilter === "solved") return solvedIds.includes(q.id);
    if (statusFilter === "unsolved") return !solvedIds.includes(q.id);
    return true;
  });

  return (
    <div className="App d-flex flex-column vh-100 bg-white">
      {showLandingPage ? (
        <LandingPage onStartPractice={() => setShowLandingPage(false)} />
      ) : (
        <>
          <nav className="navbar navbar-dark bg-dark px-4 py-2 sticky-top shadow-sm">
            <div className="container-fluid">
              <span
                className="navbar-brand fw-bold text-primary fs-4"
                onClick={handleReset}
                style={{ cursor: "pointer" }}
              >
                pseudoGuide
              </span>
            </div>
          </nav>

          <div className="container-fluid flex-grow-1 overflow-hidden p-0 bg-light">
            {!selectedQuestion ? (
              <div className="row h-100 g-0">
                {/* LEFT SIDEBAR */}
                <div className="col-lg-3 col-md-4 border-end bg-white h-100 p-5 overflow-auto">
                  {/* NEW: BACK ARROW POSITIONED ABOVE STATUS */}
                  <div className="mb-5">
                    <button
                      className="btn btn-link p-0 text-decoration-none d-flex align-items-center text-dark fw-bold"
                      onClick={goToLandingPage}
                    >
                      <span className="fs-3 me-2">←</span>
                      <span>Exit Practice</span>
                    </button>
                  </div>

                  <h6 className="text-uppercase fw-bold text-muted mb-3 small">
                    Status
                  </h6>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      checked={statusFilter === "all"}
                      onChange={() => setStatusFilter("all")}
                    />
                    <label className="form-check-label">All</label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      checked={statusFilter === "solved"}
                      onChange={() => setStatusFilter("solved")}
                    />
                    <label className="form-check-label">Solved</label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      checked={statusFilter === "unsolved"}
                      onChange={() => setStatusFilter("unsolved")}
                    />
                    <label className="form-check-label">Unsolved</label>
                  </div>

                  <hr />

                  <h6 className="text-uppercase fw-bold text-muted mb-3 mt-4 small">
                    Difficulty
                  </h6>
                  <DifficultySelector
                    selectedDifficulties={selectedDifficulties}
                    onDifficultyChange={setSelectedDifficulties}
                  />
                </div>

                <div className="col-lg-9 col-md-8 h-100 p-5 overflow-auto">
                  <div
                    className="container-fluid mx-auto"
                    style={{ maxWidth: "900px" }}
                  >
                    <h4 className="fw-bold mb-4">Challenges</h4>
                    <QuestionList
                      questions={filteredQuestions}
                      onQuestionSelect={handleQuestionSelect}
                      solvedIds={solvedIds}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Question detail view (same as before) */
              <div className="row h-100 g-0">
                <div className="col-lg-5 col-md-5 bg-white border-end h-100 overflow-auto p-5">
                  <button
                    className="btn btn-link p-0 mb-4 text-decoration-none fw-bold"
                    onClick={handleReset}
                  >
                    ← Back to Challenges
                  </button>
                  <h2 className="fw-bold mb-3">{selectedQuestion.title}</h2>
                  <p className="fs-5 text-secondary">
                    {selectedQuestion.description}
                  </p>
                </div>
                <div className="col-lg-7 col-md-7 h-100 d-flex flex-column">
                  <CodeEditor
                    question={selectedQuestion}
                    onSubmissionResult={onNewSubmissionResult}
                  />
                  {submissionResult && (
                    <div
                      className="bg-white border-top p-4 overflow-auto"
                      style={{ height: "35%" }}
                    >
                      <ResultViewer result={submissionResult} />
                    </div>
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
