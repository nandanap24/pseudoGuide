import React, { useState } from "react";

function LandingPage({ onStartPractice }) {
  const [showLearningContent, setShowLearningContent] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState({ message: "", isError: false });

  const learningData = {
    introduction: {
      whatIs:
        "Pseudocode is a high-level, informal description of a computer program or algorithm. It uses the structural conventions of normal programming languages but is intended for human reading rather than machine reading.",
      whyUse: [
        {
          title: "Bridge the Gap",
          desc: "Transition point between initial idea and actual code.",
        },
        {
          title: "Language Agnostic",
          desc: "Logic can be converted into any language (Python, Java, C++).",
        },
        {
          title: "Focus on Logic",
          desc: "Solve problems without worrying about semicolons or brackets.",
        },
        {
          title: "Collaboration",
          desc: "Easier for teams to discuss logic before implementation.",
        },
      ],
    },
    rules: [
      "Write only one statement per line.",
      "Capitalize core keywords (IF, ELSE, WHILE).",
      "Use indentation to show hierarchy.",
      "Keep statements language-independent.",
    ],
    keywords: [
      { term: "BEGIN / END", desc: "To start and close the pseudocode." },
      { term: "INPUT / READ", desc: "Get data from a user or file." },
      { term: "OUTPUT / PRINT", desc: "Display results or data." },
      { term: "SET / COMPUTE", desc: "Perform calculations or assign values." },
      { term: "IF / THEN / ELSE", desc: "Conditional branching logic." },
      { term: "WHILE / FOR", desc: "Repeated actions or iterations." },
    ],
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const input = userAnswer.trim().toUpperCase();
    if (quizStep === 1) {
      if (input === "INPUT NUMBER" || input === "READ NUMBER") {
        setFeedback({ message: "Correct!", isError: false });
        setTimeout(() => {
          setQuizStep(2);
          setUserAnswer("");
          setFeedback({ message: "", isError: false });
        }, 1000);
      } else {
        setFeedback({ message: "Try: INPUT number", isError: true });
      }
    } else if (quizStep === 2) {
      const valid = [
        "SET NUMBER <- 0",
        "COMPUTE NUMBER <- 0",
        "LET NUMBER <- 0",
        "SET NUMBER = 0",
      ];
      if (valid.includes(input)) {
        setFeedback({ message: "Great job!", isError: false });
        setTimeout(() => setQuizStep(3), 1000);
      } else {
        setFeedback({ message: "Try: SET number <- 0", isError: true });
      }
    }
  };

  return (
    <div className="landing-wrapper vh-100 d-flex flex-column bg-white">
      {/* Fixed Top Navbar */}
      <nav className="navbar navbar-light bg-black border-bottom px-4 py-2 sticky-top">
        <span
          className="navbar-brand fw-bold text-primary fs-3"
          onClick={() => setShowLearningContent(false)}
          style={{ cursor: "pointer" }}
        >
          pseudoGuide
        </span>
        <button
          onClick={() => {
            window.location.href = "http://192.168.64.183:5173";
          }}
        >
          Start Coding
        </button>
      </nav>

      {!showLearningContent ? (
        /* Standard Hero View */
        <div className="hero-section flex-grow-1 d-flex align-items-center justify-content-center text-center">
          <div className="container">
            <h1 className="display-3 fw-bold mb-3">
              Master Algorithmic Thinking.
            </h1>
            <p className="lead text-muted mb-5">
              Before you write the code, you must solve the logic. pseudoGuide
              helps you bridge the gap between human language and computer
              instructions.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-primary btn-lg"
                onClick={onStartPractice}
              >
                Start Practice
              </button>
              <button
                className="btn btn-outline-dark btn-lg"
                onClick={() => setShowLearningContent(true)}
              >
                Let's Learn
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* THE LEARNING PLATFORM WORKSPACE */
        <div className="container-fluid flex-grow-1 overflow-hidden">
          <div className="row h-100">
            {/* LEFT SIDEBAR: Nav (Scrollable) */}
            <div className="col-lg-3 col-md-4 border-end h-100 overflow-auto py-4 px-3 bg-light custom-scrollbar">
              <button
                className="btn btn-link text-decoration-none mb-4"
                onClick={() => setShowLearningContent(false)}
              >
                &larr; Back to Home
              </button>
              <h6 className="text-uppercase fw-bold text-muted small mb-3">
                Curriculum
              </h6>
              <div className="list-group list-group-flush shadow-sm rounded">
                <a
                  href="#what"
                  className="list-group-item list-group-item-action border-0 py-3"
                >
                  1. What is Pseudocode?
                </a>
                <a
                  href="#why"
                  className="list-group-item list-group-item-action border-0 py-3"
                >
                  2. Why use it?
                </a>
                <a
                  href="#rules"
                  className="list-group-item list-group-item-action border-0 py-3"
                >
                  3. The Rules
                </a>
                <a
                  href="#keywords"
                  className="list-group-item list-group-item-action border-0 py-3"
                >
                  4. Core Keywords
                </a>
                <a
                  href="#quiz"
                  className="list-group-item list-group-item-action border-0 py-3 "
                >
                  5. Knowledge Check
                </a>
              </div>
            </div>

            {/* RIGHT CONTENT: Details (Scrollable) */}
            <div className="col-lg-9 col-md-8 h-100 overflow-auto py-5 px-5 custom-scrollbar">
              <section id="what" className="mb-5">
                <h2 className="fw-bold display-6">What is Pseudocode?</h2>
                <hr className="mb-4" />
                <p className="fs-5 text-secondary leading-relaxed">
                  {learningData.introduction.whatIs}
                </p>
              </section>

              <section id="why" className="mb-5 pt-4">
                <h2 className="fw-bold mb-4">Why use it?</h2>
                <div className="row g-3">
                  {learningData.introduction.whyUse.map((item, i) => (
                    <div className="col-md-6" key={i}>
                      <div className="card h-100 border-0 shadow-sm bg-primary-subtle p-3">
                        <h6 className="fw-bold text-primary">{item.title}</h6>
                        <p className="small mb-0">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="rules" className="mb-5 pt-4">
                <h2 className="fw-bold mb-4">The Standard Rules</h2>
                <ul className="list-group border-0">
                  {learningData.rules.map((rule, i) => (
                    <li
                      className="list-group-item border-0 px-0 d-flex align-items-center"
                      key={i}
                    >
                      <span className="badge bg-success rounded-circle me-3 p-2">
                        ✓
                      </span>{" "}
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="keywords" className="mb-5 pt-4">
                <h2 className="fw-bold mb-4">Core Keywords</h2>
                <div className="table-responsive border rounded">
                  <table className="table table-hover mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Keyword</th>
                        <th>Functionality</th>
                      </tr>
                    </thead>
                    <tbody>
                      {learningData.keywords.map((k, i) => (
                        <tr key={i}>
                          <td className="fw-bold font-monospace text-primary">
                            {k.term}
                          </td>
                          <td>{k.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                id="quiz"
                className="bg-dark text-white p-5 rounded-4 shadow-lg text-center mt-5 mb-5"
              >
                {quizStep === 0 ? (
                  <>
                    <h2 className="fw-bold mb-3">Knowledge Check</h2>
                    <button
                      className="btn btn-primary btn-lg px-5"
                      onClick={() => setQuizStep(1)}
                    >
                      Start Mini Quiz
                    </button>
                  </>
                ) : quizStep === 3 ? (
                  <div className="animate-fade-in">
                    <h2 className="fw-bold mb-3">Logic Verified! 🎉</h2>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={onStartPractice}
                    >
                      Enter Arena
                    </button>
                  </div>
                ) : (
                  <div className="quiz-box animate-fade-in">
                    <h5 className="mb-4">
                      {quizStep === 1
                        ? "Task: INPUT a variable named 'number'"
                        : "Task: SET 'number' to 0"}
                    </h5>
                    <form
                      onSubmit={handleQuizSubmit}
                      className="mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      <input
                        type="text"
                        className="form-control form-control-lg mb-2 font-monospace bg-dark text-info border-secondary"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        autoFocus
                      />
                      <div
                        className={`small mb-3 ${
                          feedback.isError ? "text-danger" : "text-success"
                        }`}
                      >
                        {feedback.message}
                      </div>
                      <button type="submit" className="btn btn-light w-100">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
