import React, { useState, useEffect } from "react";
import { checkPseudocode } from "../services/api";

function CodeEditor({ question, onSubmissionResult }) {
  const [userCode, setUserCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUserCode("");
  }, [question]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await checkPseudocode(question.id, userCode);
      onSubmissionResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* PROFESSIONAL TOOLBAR */}
      <div className="bg-light border-bottom py-2 px-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small fw-bold">main.pseudo</span>
        </div>
        <button
          className="btn btn-success btn-sm px-4 fw-bold shadow-sm"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Running..." : "Submit"}
        </button>
      </div>

      {/* SEAMLESS TEXTAREA */}
      <textarea
        className="form-control border-0 flex-grow-1 p-4 font-monospace fs-5"
        style={{
          backgroundColor: "#fcfcfc",
          resize: "none",
          outline: "none",
          minHeight: "0",
        }}
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="BEGIN&#10;  // Write your logic here...&#10;END"
      />
    </div>
  );
}

export default CodeEditor;
